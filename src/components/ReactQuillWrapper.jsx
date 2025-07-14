'use client'

import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import dynamic from 'next/dynamic'


const ReactQuillComponent = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <div className="h-64 bg-muted animate-pulse rounded"></div>
})


if (typeof window !== 'undefined') {
    const originalConsoleError = console.error
    console.error = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('findDOMNode')) {
            // Suppress findDOMNode warnings
            return
        }
        originalConsoleError.apply(console, args)
    }
}


const ReactQuillWrapper = forwardRef(({ 
    value, 
    onChange, 
    modules, 
    formats, 
    theme = 'snow', 
    placeholder,
    style,
    ...props 
}, ref) => {
    const quillRef = useRef(null)
    const isClient = typeof window !== 'undefined'

    useImperativeHandle(ref, () => ({
        getEditor: () => quillRef.current?.getEditor?.(),
        focus: () => quillRef.current?.focus?.(),
        blur: () => quillRef.current?.blur?.(),
    }))

    // Only render on client side to avoid SSR issues
    if (!isClient) {
        return <div className="h-64 bg-muted animate-pulse rounded"></div>
    }

    return (
        <div className="react-quill-wrapper">
            <ReactQuillComponent
                ref={quillRef}
                theme={theme}
                value={value || ''}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                style={style}
                {...props}
            />
        </div>
    )
})

ReactQuillWrapper.displayName = 'ReactQuillWrapper'

export default ReactQuillWrapper
