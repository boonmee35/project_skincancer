import React, { useEffect, useRef, useState, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline
} from 'ckeditor5';
import translations from 'ckeditor5/translations/th.js';
import 'ckeditor5/ckeditor5.css';

const LICENSE_KEY = 'GPL';

export default function CKEditorField({ value, onChange }) {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) return {};

    return {
      editorConfig: {
        placeholder: "พิมพ์เนื้อหาบทความที่นี่...",
        toolbar: {
          items: [
            'heading', '|', 'bold', 'italic', 'underline', '|',
            'link', 'insertImage', 'mediaEmbed', 'insertTable', 'blockQuote',
            '|', 'alignment', '|', 'bulletedList', 'numberedList',
            'outdent', 'indent'
          ],
        },
        plugins: [
          Alignment, Autoformat, AutoImage, Autosave, BlockQuote, Bold,
          Essentials, GeneralHtmlSupport, Heading, ImageBlock, ImageCaption, ImageInline,
          ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative,
          ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, Link, LinkImage,
          List, ListProperties, MediaEmbed, Paragraph, PasteFromOffice,
          Table, TableCaption, TableCellProperties, TableColumnResize,
          TableProperties, TableToolbar, TextTransformation, TodoList, Underline
        ],
        image: {
          toolbar: [
            'toggleImageCaption', 'imageTextAlternative', '|',
            'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage'
          ],
          upload: {
            types: ['jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff']
          }
        },
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
          ]
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file'
              }
            }
          }
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        translations: [translations],
        language: 'th',
        licenseKey: LICENSE_KEY
      }
    };
  }, [isLayoutReady]);

  return (
    <div className="h-[250px] border rounded overflow-hidden">
      {editorConfig && (
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      )}
    </div>
  );
}
