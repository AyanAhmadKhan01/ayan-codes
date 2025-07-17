'use client'

import dynamic from 'next/dynamic'
import { forwardRef, useImperativeHandle, useRef } from 'react'
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


  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
    focus: () => quillRef.current?.focus(),
    blur: () => quillRef.current?.blur(),
    getHTML: () => value,
    getText: () => quillRef.current?.getEditor()?.getText() || '',
  }))


  const handleImageClick = () => {
    if (onImageInsert) {
      onImageInsert()
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

  return (
    <div className="quill-editor-wrapper border border-border/20 bg-card/50 backdrop-blur-sm rounded-sm overflow-hidden">

      <div className="flex gap-1 p-3 border-b border-border/20 bg-background/50 flex-wrap">
        
  
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('bold', !quillRef.current?.getEditor()?.getFormat()?.bold)}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('italic', !quillRef.current?.getEditor()?.getFormat()?.italic)}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('underline', !quillRef.current?.getEditor()?.getFormat()?.underline)}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
        
      
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('header', 1)}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('header', 2)}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
        
     
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('list', 'ordered')}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('list', 'bullet')}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
        
        {/* Alignment */}
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('align', '')}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('align', 'center')}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('align', 'right')}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
        
       
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('blockquote', !quillRef.current?.getEditor()?.getFormat()?.blockquote)}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => quillRef.current?.getEditor()?.format('code-block', !quillRef.current?.getEditor()?.getFormat()['code-block'])}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-px h-6 bg-border/30 mx-2 self-center"></div>
        
   
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={() => {
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
            }}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Link"
          >
            <Link className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={handleImageClick}
            className="p-2 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30"
            title="Image"
          >
            <Image className="w-4 h-4" />
          </button>
        </div>
      </div>

    
      <div style={{ minHeight: height }}>
        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder={placeholder}
          readOnly={readOnly}
          style={{
            height: 'auto',
            minHeight: height
          }}
        />
      </div>

     
      <style jsx global>{`
        .quill-editor-wrapper .ql-toolbar {
          display: none;
        }
        .quill-editor-wrapper .ql-container {
          border: none;
        }
        .quill-editor-wrapper .ql-editor {
          padding: 1rem;
          font-size: 14px;
          line-height: 1.6;
        }
        .quill-editor-wrapper .ql-editor.ql-blank::before {
          font-style: italic;
          color: #9ca3af;
        }
      `}</style>
    </div>
  )
})

QuillEditor.displayName = 'QuillEditor'

export default QuillEditor
