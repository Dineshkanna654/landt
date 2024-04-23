import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import jsPDF from 'jspdf';
import Header from '../components/header';
import './billing.css';
import { Button } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Invoice = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const companyName = 'Your Company Name';
    const productName = 'Product Name';
    const price = 10.00; // Example price
    const quantity = 2; // Example quantity
    const gst = 18; // Example GST percentage
    const tax = price * quantity * (gst / 100);
    doc.text("Invoice", 10, 10);
    doc.text(`Company Name: ${companyName}`, 10, 20);
    doc.text(`Product Name: ${productName}`, 10, 30);
    doc.text(`Price: ${price}`, 10, 40);
    doc.text(`Quantity: ${quantity}`, 10, 50);
    doc.text(`GST: ${gst}%`, 10, 60);
    doc.text(`Tax: ${tax}`, 10, 70);
    const pdfDataUri = doc.output('datauristring');
    setPageNumber(1);
    setNumPages(1);
    await fetch(pdfDataUri)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='dash-container'>
      <Header/>
      <div className='paper'>
        <h1>Invoice</h1>
        <div className='pdf-btn'>
        <Button type='primary' onClick={generatePDF}>Generate PDF</Button>
        </div>
        {pdfUrl && (
          <div className='pdf'>
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} className='invoice-doc'>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
            <Button type='primary' onClick={handlePrint}>Print</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
