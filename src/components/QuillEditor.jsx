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
  
  // Track active formatting states
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

  // Update active formats when selection changes
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
          editor.insertEmbed(range ? range.index : 0, 'image', url)
          if (range) {
            editor.setSelection(range.index + 1)
          }
        }
      }
    }
  }

  const handleLinkClick = () => {
    if (onImageInsert) {
      // Use the same modal pattern as image insertion
      onImageInsert('link')
    } else {
      const url = prompt('Enter link URL:')
      if (url) {
        const text = prompt('Enter link text (optional):') || url
        const editor = quillRef.current?.getEditor()
        const range = editor?.getSelection()
        if (range && range.length > 0) {
          editor.format('link', url)
        } else {
          editor?.insertText(range?.index || 0, text, 'link', url)
        }
      }
    }
  }

  // Quill modules configuration with proper toolbar
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

  // Fixed formats array - removed 'bullet' and added proper ones
  const formats = [
    'header', 'bold', 'italic', 'underline', 
    'list', 'align', 'link', 'image', 'blockquote', 'code-block'
  ]

  // Set up selection change listener
  useEffect(() => {
    const editor = quillRef.current?.getEditor()
    if (editor) {
      // Initial format check
      updateActiveFormats()
      
      // Set up event listeners
      editor.on('selection-change', updateActiveFormats)
      editor.on('text-change', updateActiveFormats)
      
      return () => {
        editor.off('selection-change', updateActiveFormats)
        editor.off('text-change', updateActiveFormats)
      }
    }
  }, [value]) // Add value as dependency to ensure it runs when editor content changes

  // Also trigger update when editor becomes available
  useEffect(() => {
    if (quillRef.current?.getEditor()) {
      updateActiveFormats()
    }
  }, [quillRef.current])

  // Helper function to get button classes based on active state
  const getButtonClasses = (isActive) => {
    const baseClasses = "p-2 rounded-sm transition-colors border"
    if (isActive) {
      return `${baseClasses} bg-primary/20 border-primary/30 text-primary hover:bg-primary/30 hover:border-primary/40`
    }
    return `${baseClasses} border-transparent hover:bg-muted/50 hover:border-border/30`
  }

  return (
    <div className="quill-editor-wrapper border border-border/20 bg-card/50 backdrop-blur-sm rounded-sm overflow-hidden">

      <div className="flex gap-1 p-3 border-b border-border/20 bg-background/50 flex-wrap">
        
  
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('bold', !activeFormats.bold)
              setTimeout(updateActiveFormats, 10) // Update after format is applied
            }}
            className={getButtonClasses(activeFormats.bold)}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('italic', !activeFormats.italic)
              setTimeout(updateActiveFormats, 10)
            }}
            className={getButtonClasses(activeFormats.italic)}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('underline', !activeFormats.underline)
              setTimeout(updateActiveFormats, 10)
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
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('header', 1)
              setTimeout(updateActiveFormats, 10)
            }}
            className={getButtonClasses(activeFormats.header === 1)}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('header', 2)
              setTimeout(updateActiveFormats, 10)
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
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('list', 'ordered')
              setTimeout(updateActiveFormats, 10)
            }}
            className={getButtonClasses(activeFormats.list === 'ordered')}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('list', 'bullet')
              setTimeout(updateActiveFormats, 10)
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
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('align', '')
              setTimeout(updateActiveFormats, 10)
            }}
            className={getButtonClasses(activeFormats.align === '' || !activeFormats.align)}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('align', 'center')
              setTimeout(updateActiveFormats, 10)
            }}
            className={getButtonClasses(activeFormats.align === 'center')}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('align', 'right')
              setTimeout(updateActiveFormats, 10)
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
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('blockquote', !activeFormats.blockquote)
              setTimeout(updateActiveFormats, 10)
            }}
            className={getButtonClasses(activeFormats.blockquote)}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => {
              const editor = quillRef.current?.getEditor()
              editor?.format('code-block', !activeFormats['code-block'])
              setTimeout(updateActiveFormats, 10)
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
            onClick={handleLinkClick}
            className={getButtonClasses(activeFormats.link)}
            title="Link"
          >
            <Link className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={handleImageClick}
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
