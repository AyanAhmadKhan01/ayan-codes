'use client'

import dynamic from 'next/dynamic'
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  Heading1, 
  Heading2,
  Link, 
  Image, 
  Quote, 
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => (
    <div className="border border-border/20 bg-card/50 backdrop-blur-sm rounded-sm">
      <div className="flex items-center justify-center p-8 min-h-[400px]">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    </div>
  )
})

const QuillEditor = forwardRef(({ 
  value = '', 
  onChange, 
  placeholder = 'Start writing your content...',
  height = '400px',
  onImageInsert,
  readOnly = false 
}, ref) => {
  const quillRef = useRef(null)
  
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [linkRange, setLinkRange] = useState(null)
  

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    header: false,
    list: false,
    align: '',
    blockquote: false,
    'code-block': false,
    link: false
  })

  
  const updateActiveFormats = () => {
    const editor = quillRef.current?.getEditor()
    if (editor) {
      const format = editor.getFormat()
      setActiveFormats({
        bold: !!format.bold,
        italic: !!format.italic,
        underline: !!format.underline,
        header: !!format.header,
        list: format.list || false,
        align: format.align || '',
        blockquote: !!format.blockquote,
        'code-block': !!format['code-block'],
        link: !!format.link
      })
    }
  }

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
    focus: () => quillRef.current?.focus(),
    blur: () => quillRef.current?.blur(),
    getHTML: () => value,
    getText: () => quillRef.current?.getEditor()?.getText() || '',
  }))

  const handleImageClick = () => {
    if (onImageInsert) {
      onImageInsert('image')
    } else {
      const url = prompt('Enter image URL:')
      if (url) {
        const editor = quillRef.current?.getEditor()
        if (editor) {
          const range = editor.getSelection()
          const insertIndex = range ? range.index : editor.getLength()
          editor.insertEmbed(insertIndex, 'image', url)
          editor.setSelection(insertIndex + 1)
        }
      }
    }
  }

  const handleLinkClick = () => {
    const editor = quillRef.current?.getEditor()
    if (editor) {
      const range = editor.getSelection()
      if (!range) {
        editor.focus()
        setTimeout(() => {
          const newRange = editor.getSelection()
          if (newRange) {
            setLinkRange(newRange)
            setLinkText('')
            setLinkUrl('')
            setShowLinkModal(true)
          }
        }, 100)
        return
      }
      
      setLinkRange(range)
      
      if (range && range.length > 0) {
        const selectedText = editor.getText(range.index, range.length)
        setLinkText(selectedText)
      } else {
        setLinkText('')
      }
      
      setLinkUrl('')
      setShowLinkModal(true)
    }
  }

  const handleLinkSubmit = () => {
    const editor = quillRef.current?.getEditor()
    if (editor && linkRange && linkUrl) {
      if (linkRange.length > 0) {
  
        editor.setSelection(linkRange)
        editor.format('link', linkUrl)
      } else {
        const text = linkText || linkUrl
        editor.insertText(linkRange.index, text)
        editor.setSelection(linkRange.index, text.length)
        editor.format('link', linkUrl)
        editor.setSelection(linkRange.index + text.length)
      }
      
  
      setShowLinkModal(false)
      setLinkUrl('')
      setLinkText('')
      setLinkRange(null)
      setTimeout(updateActiveFormats, 10)
    }
  }

  const handleLinkCancel = () => {
    setShowLinkModal(false)
    setLinkUrl('')
    setLinkText('')
    setLinkRange(null)
  }


  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }

 
  const formats = [
    'header', 'bold', 'italic', 'underline', 
    'list', 'align', 'link', 'image', 'blockquote', 'code-block'
  ]


  useEffect(() => {
    const editor = quillRef.current?.getEditor()
    if (editor) {
      updateActiveFormats()
      
      const handleSelectionChange = (range) => {
        if (range && editor.hasFocus()) {
          updateActiveFormats()
        }
      }
      
      const handleTextChange = () => {
        if (editor.hasFocus()) {
          updateActiveFormats()
        }
      }
      
      editor.on('selection-change', handleSelectionChange)
      editor.on('text-change', handleTextChange)
      
      return () => {
        editor.off('selection-change', handleSelectionChange)
        editor.off('text-change', handleTextChange)
      }
    }
  }, [value])

  useEffect(() => {
    const editor = quillRef.current?.getEditor()
    if (editor) {
      updateActiveFormats()
    }
  }, [quillRef.current])

  const getButtonClasses = (isActive) => {
    const baseClasses = "p-2 rounded-sm transition-colors border"
    if (isActive) {
      return `${baseClasses} bg-primary/20 border-primary/30 text-primary hover:bg-primary/30 hover:border-primary/40`
    }
    return `${baseClasses} border-transparent hover:bg-muted/50 hover:border-border/30`
  }

  return (
    <div className="quill-editor-wrapper border border-border/20 bg-card/50 backdrop-blur-sm rounded-sm overflow-hidden">
      
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card/95 backdrop-blur-sm border border-border/20 rounded-lg p-6 w-96 max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Add Link</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 bg-background border border-border/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50"
                  autoFocus
                />
              </div>
              
              {linkRange && linkRange.length === 0 && (
                <div>
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Link Text</label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Enter link text"
                    className="w-full px-3 py-2 bg-background border border-border/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleLinkSubmit}
                disabled={!linkUrl}
                className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
              >
                Add Link
              </button>
              <button
                onClick={handleLinkCancel}
                className="flex-1 bg-muted text-muted-foreground py-2 px-4 rounded-md hover:bg-muted/80 hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-1 p-3 border-b border-border/20 bg-background/50 flex-wrap">
        
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('bold', !activeFormats.bold)
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.bold)}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('italic', !activeFormats.italic)
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.italic)}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('underline', !activeFormats.underline)
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.underline)}
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
     
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('header', 1)
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.header === 1)}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('header', 2)
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.header === 2)}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
  
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('list', 'ordered')
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.list === 'ordered')}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('list', 'bullet')
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.list === 'bullet')}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
        
    
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('align', '')
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.align === '' || !activeFormats.align)}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('align', 'center')
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.align === 'center')}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('align', 'right')
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.align === 'right')}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
        
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('blockquote', !activeFormats.blockquote)
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats.blockquote)}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const editor = quillRef.current?.getEditor()
              if (editor) {
                editor.format('code-block', !activeFormats['code-block'])
                setTimeout(updateActiveFormats, 10)
              }
            }}
            className={getButtonClasses(activeFormats['code-block'])}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
        
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick()
            }}
            className={getButtonClasses(activeFormats.link)}
            title="Link"
          >
            <Link className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handleImageClick()
            }}
            className={getButtonClasses(false)}
            title="Image"
          >
            <Image className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div style={{ minHeight: height }} className="[&_.ql-toolbar]:hidden [&_.ql-container]:border-none">
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder={placeholder}
          readOnly={readOnly}
          className="[&_.ql-editor]:p-4 [&_.ql-editor]:text-sm [&_.ql-editor]:leading-relaxed [&_.ql-editor.ql-blank::before]:italic [&_.ql-editor.ql-blank::before]:text-gray-400"
          style={{
            height: 'auto',
            minHeight: height
          }}
        />
      </div>
    </div>
  )
})

QuillEditor.displayName = 'QuillEditor'

export default QuillEditor
