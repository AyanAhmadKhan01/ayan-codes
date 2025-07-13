'use client'

import { useState, useRef, useEffect } from 'react'
import { 
    Bold, 
    Italic, 
    Underline, 
    List, 
    AlignLeft, 
    AlignCenter, 
    AlignRight,
    Quote,
    Link,
    Image as ImageIcon,
    Type,
    Palette
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SimpleEditor({ value = '', onChange, placeholder = 'Start writing...', onImageInsert }) {
    const [content, setContent] = useState(value)
    const editorRef = useRef(null)
    const [showImageModal, setShowImageModal] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [linkText, setLinkText] = useState('')

    useEffect(() => {
        setContent(value)
    }, [value])

    const handleContentChange = () => {
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML
            setContent(newContent)
            onChange?.(newContent)
        }
    }

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value)
        editorRef.current?.focus()
        handleContentChange()
    }

    const insertImage = () => {
        if (imageUrl.trim()) {
            execCommand('insertImage', imageUrl)
            setImageUrl('')
            setShowImageModal(false)
            onImageInsert?.(imageUrl)
        }
    }

    const insertLink = () => {
        if (linkUrl.trim()) {
            const selection = window.getSelection()
            if (selection.toString().trim()) {
                execCommand('createLink', linkUrl)
            } else {
                const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText || linkUrl}</a>`
                execCommand('insertHTML', linkHtml)
            }
            setLinkUrl('')
            setLinkText('')
            setShowLinkModal(false)
        }
    }

    const insertHeading = (level) => {
        execCommand('formatBlock', `h${level}`)
    }

    return (
        <div className="border border-border/20 bg-background/50 rounded-none overflow-hidden">
            {/* Toolbar */}
            <div className="border-b border-border/20 p-3 bg-muted/20">
                <div className="flex flex-wrap items-center gap-1">
                    {/* Text Formatting */}
                    <div className="flex items-center gap-1 mr-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => execCommand('bold')}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => execCommand('italic')}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <Italic className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => execCommand('underline')}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <Underline className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Headings */}
                    <div className="flex items-center gap-1 mr-4">
                        <select
                            onChange={(e) => {
                                if (e.target.value) {
                                    if (e.target.value === 'p') {
                                        execCommand('formatBlock', 'div')
                                    } else {
                                        insertHeading(e.target.value)
                                    }
                                    e.target.value = ''
                                }
                            }}
                            className="px-2 py-1 text-xs border border-border/20 bg-background rounded-none"
                        >
                            <option value="">Heading</option>
                            <option value="1">H1</option>
                            <option value="2">H2</option>
                            <option value="3">H3</option>
                            <option value="4">H4</option>
                            <option value="5">H5</option>
                            <option value="6">H6</option>
                            <option value="p">Normal</option>
                        </select>
                    </div>

                    {/* Alignment */}
                    <div className="flex items-center gap-1 mr-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => execCommand('justifyLeft')}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <AlignLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => execCommand('justifyCenter')}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <AlignCenter className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => execCommand('justifyRight')}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <AlignRight className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Lists */}
                    <div className="flex items-center gap-1 mr-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => execCommand('insertUnorderedList')}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <List className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => execCommand('insertOrderedList')}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <Type className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Quote */}
                    <div className="flex items-center gap-1 mr-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => execCommand('formatBlock', 'blockquote')}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <Quote className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Insert Options */}
                    <div className="flex items-center gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowLinkModal(true)}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <Link className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowImageModal(true)}
                            className="h-8 w-8 p-0 rounded-none"
                        >
                            <ImageIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleContentChange}
                onBlur={handleContentChange}
                dangerouslySetInnerHTML={{ __html: content }}
                className="min-h-[400px] p-4 focus:outline-none prose prose-sm max-w-none"
                style={{
                    lineHeight: '1.6',
                    fontFamily: 'inherit'
                }}
                data-placeholder={placeholder}
            />

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border/20 p-6 max-w-md w-full">
                        <h3 className="text-lg font-medium mb-4">Insert Image</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Image URL</label>
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-3 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none"
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={insertImage} className="rounded-none flex-1">
                                    Insert Image
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setShowImageModal(false)
                                        setImageUrl('')
                                    }}
                                    className="rounded-none"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Link Modal */}
            {showLinkModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border/20 p-6 max-w-md w-full">
                        <h3 className="text-lg font-medium mb-4">Insert Link</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">URL</label>
                                <input
                                    type="url"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full px-3 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Link Text (optional)</label>
                                <input
                                    type="text"
                                    value={linkText}
                                    onChange={(e) => setLinkText(e.target.value)}
                                    placeholder="Click here"
                                    className="w-full px-3 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none"
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={insertLink} className="rounded-none flex-1">
                                    Insert Link
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setShowLinkModal(false)
                                        setLinkUrl('')
                                        setLinkText('')
                                    }}
                                    className="rounded-none"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    pointer-events: none;
                }
                
                [contenteditable] h1 {
                    font-size: 2em;
                    font-weight: bold;
                    margin: 0.67em 0;
                }
                
                [contenteditable] h2 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin: 0.75em 0;
                }
                
                [contenteditable] h3 {
                    font-size: 1.17em;
                    font-weight: bold;
                    margin: 0.83em 0;
                }
                
                [contenteditable] h4 {
                    font-size: 1em;
                    font-weight: bold;
                    margin: 1em 0;
                }
                
                [contenteditable] h5 {
                    font-size: 0.83em;
                    font-weight: bold;
                    margin: 1.5em 0;
                }
                
                [contenteditable] h6 {
                    font-size: 0.75em;
                    font-weight: bold;
                    margin: 1.67em 0;
                }
                
                [contenteditable] p {
                    margin: 1em 0;
                }
                
                [contenteditable] blockquote {
                    margin: 1em 40px;
                    padding-left: 1em;
                    border-left: 3px solid #ccc;
                    font-style: italic;
                }
                
                [contenteditable] ul, [contenteditable] ol {
                    margin: 1em 0;
                    padding-left: 40px;
                }
                
                [contenteditable] img {
                    max-width: 100%;
                    height: auto;
                    margin: 1em 0;
                }
                
                [contenteditable] a {
                    color: hsl(var(--primary));
                    text-decoration: underline;
                }
            `}</style>
        </div>
    )
}
