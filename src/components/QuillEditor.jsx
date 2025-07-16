'use client'

import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

const QuillEditor = forwardRef(({ 
    value = '', 
    onChange, 
    placeholder = 'Start typing...',
    height = '400px',
    onImageInsert,
    readOnly = false 
}, ref) => {
    const containerRef = useRef(null)
    const quillRef = useRef(null)
    const isUpdatingRef = useRef(false)

    useImperativeHandle(ref, () => ({
        getEditor: () => quillRef.current,
        focus: () => quillRef.current?.focus(),
        blur: () => quillRef.current?.blur(),
        getHTML: () => quillRef.current?.root.innerHTML || '',
        getText: () => quillRef.current?.getText() || '',
        setContents: (delta) => quillRef.current?.setContents(delta),
        insertText: (index, text) => quillRef.current?.insertText(index, text),
        insertEmbed: (index, type, value) => quillRef.current?.insertEmbed(index, type, value)
    }))

    useEffect(() => {
        if (!containerRef.current || quillRef.current || typeof window === 'undefined') return

        // Dynamically import Quill only on client side
        const loadQuillEditor = async () => {
            try {
                const QuillModule = await import('quill')
                await import('quill/dist/quill.snow.css')
                const Quill = QuillModule.default
                
                if (!containerRef.current) return

                const imageHandler = () => {
                    if (onImageInsert) {
                        onImageInsert()
                    } else {
                        const url = prompt('Enter image URL:')
                        if (url) {
                            const range = quillRef.current.getSelection()
                            if (range) {
                                quillRef.current.insertEmbed(range.index, 'image', url)
                                quillRef.current.setSelection(range.index + 1)
                            }
                        }
                    }
                }

                const quillConfig = {
                    theme: 'snow',
                    placeholder,
                    readOnly,
                    modules: {
                        toolbar: {
                            container: [
                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'color': [] }, { 'background': [] }],
                                [{ 'align': [] }],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['blockquote', 'code-block'],
                                ['link', 'image'],
                                ['clean']
                            ],
                            handlers: {
                                image: imageHandler
                            }
                        },
                        clipboard: {
                            matchVisual: false,
                        }
                    },
                    formats: [
                        'header', 'bold', 'italic', 'underline', 'strike',
                        'color', 'background', 'align', 'list',
                        'blockquote', 'code-block', 'link', 'image'
                    ]
                }

                quillRef.current = new Quill(containerRef.current, quillConfig)

                if (value) {
                    isUpdatingRef.current = true
                    quillRef.current.root.innerHTML = value
                    isUpdatingRef.current = false
                }

                const handleTextChange = () => {
                    if (isUpdatingRef.current) return
                    
                    const html = quillRef.current.root.innerHTML
                    if (onChange) {
                        onChange(html)
                    }
                }

                quillRef.current.on('text-change', handleTextChange)

                const editorContainer = containerRef.current.querySelector('.ql-editor')
                if (editorContainer) {
                    editorContainer.style.minHeight = height
                }

            } catch (error) {
                console.error('Failed to load Quill editor:', error)
            }
        }

        loadQuillEditor()

        return () => {
            if (quillRef.current) {
                quillRef.current.off('text-change')
            }
        }
    }, [placeholder, readOnly, height, onImageInsert])

   
    useEffect(() => {
        if (!quillRef.current || isUpdatingRef.current) return
        
        const currentContent = quillRef.current.root.innerHTML
        if (currentContent !== value) {
            isUpdatingRef.current = true
            quillRef.current.root.innerHTML = value || ''
            isUpdatingRef.current = false
        }
    }, [value])

    return (
        <div className="quill-editor-wrapper modern-quill border border-border/20 bg-card/50 backdrop-blur-sm">
            <div ref={containerRef} className="quill-container" />
        </div>
    )
})

QuillEditor.displayName = 'QuillEditor'

export default QuillEditor
