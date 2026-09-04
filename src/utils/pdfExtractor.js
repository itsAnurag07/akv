// ============================================================
// AKV GLOBAL CONSULTANCY — PDF Processing & Image Extractor Utility
// Converts PDF document pages into high-resolution images & stores brochure URL
// ============================================================
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker src for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;

/**
 * Reads a PDF file, extracts all pages as JPEG data URLs, and reads original PDF as Data URL.
 * @param {File} file - PDF File object from input
 * @param {function} progressCallback - Optional progress callback (pageIndex, totalPages)
 * @returns {Promise<{ pdfUrl: string, pageImages: string[] }>}
 */
export async function processPdfFile(file, progressCallback) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      try {
        const pdfDataUrl = e.target.result;
        const arrayBuffer = await file.arrayBuffer();

        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        const totalPages = pdfDoc.numPages;
        const pageImages = [];

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
          if (progressCallback) progressCallback(pageNum, totalPages);

          const page = await pdfDoc.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.8 }); // 1.8x scale for crisp high-resolution images

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          await page.render(renderContext).promise;
          const imgDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          pageImages.push(imgDataUrl);
        }

        resolve({
          pdfUrl: pdfDataUrl,
          pdfName: file.name,
          pageImages
        });
      } catch (err) {
        console.error('Error processing PDF file:', err);
        // Fallback: If canvas rendering fails, return just the PDF URL
        const reader = new FileReader();
        reader.onload = (ev) => resolve({ pdfUrl: ev.target.result, pdfName: file.name, pageImages: [] });
        reader.onerror = (readErr) => reject(readErr);
        reader.readAsDataURL(file);
      }
    };

    fileReader.onerror = (err) => reject(err);
    fileReader.readAsDataURL(file);
  });
}
