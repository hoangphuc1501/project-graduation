import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ initialValue, onChange, height }) => {
    const editorRef = useRef(null);

    const handleEditorChange = () => {
        if (editorRef.current) {
            onChange(editorRef.current.getContent());
        }
    };

    return (
        <Editor
            apiKey="9638jq9706s3yt930lpgbv68jcxiaqimrg9sokwlsz1t56e0"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue={initialValue}
            init={{
                height: height,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={handleEditorChange}
        />
    );
};

export default TextEditor;
