'use client'

import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
    SimpleUploadAdapter,
    ClassicEditor,
    Autoformat,
    Bold,
    Italic,
    Underline,
    BlockQuote,
    CloudServices,
    Essentials,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    TableToolbar,
    TextTransformation,
    Alignment,
    Undo,
    ImageResize,
} from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'
import { useSession } from 'next-auth/react'

interface CustomEditorProps {
    value: string;
    onChange: (data: string) => void;
    disabled?: boolean;
}

const CustomEditor = ({ value, onChange, disabled }: CustomEditorProps) => {
    const { data: session } = useSession()
    const token = session?.user?.token

    const editorConfig: any = {
        plugins: [
            SimpleUploadAdapter, Autoformat, BlockQuote, Bold, Italic, Underline,
            Essentials, Image, ImageCaption, ImageStyle,
            ImageToolbar, ImageUpload, Indent, IndentBlock, Link,
            List, MediaEmbed, Paragraph,
            Table, TableToolbar,
            TextTransformation, Alignment, Undo,
            CloudServices, ImageResize,
        ],
        simpleUpload: {
            uploadUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/ckeditor/upload`,
            headers: {
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            }
        },
        toolbar: [
            'undo', 'redo',  
            '|', 'bold', 'italic', 'underline', 
            '|', 'link', 'uploadImage', 'insertTable', 'mediaEmbed', 
            '|', 'bulletedList', 'numberedList', 'alignment', 'outdent', 'indent',
        ],
        mediaEmbed: {
            previewsInData: true
        },
        shouldNotGroupWhenFull: true,
        image: {
            toolbar: [
                'imageStyle:inline', 
                'imageStyle:wrapText', 
                'imageStyle:block',
                '|',
                'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original',
                '|',
                'toggleImageCaption', 
                'imageTextAlternative'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn', 
                'tableRow',
                'mergeTableCells'
            ]
        },
        licenseKey: 'GPL',
    }

    return (
        <div className="ck-editor-container">
            <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={value}
                disabled={disabled}
                onChange={(event, editor) => {
                    const data = editor.getData()
                    onChange(data)
                }}
            />
        </div>
    )
}

export default CustomEditor