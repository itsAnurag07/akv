// ============================================================
// AKV GLOBAL CONSULTANCY — PDF Processing & Image Extractor Utility
// Converts PDF document pages into high-resolution images & stores brochure URL
// ============================================================
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure matching bundled local worker URL for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Reads a PDF file, extracts all pages as JPEG data URLs, and reads original PDF as Data URL.
 * @param {File} file - PDF File object from input
 * @param {function} progressCallback - Optional progress callback (pageIndex, totalPages)
 * @returns {Promise<{ pdfUrl: string, pdfName: string, pageImages: string[] }>}
 */
export async function processPdfFile(file, progressCallback) {
  const arrayBuffer = await file.arrayBuffer();
  
  // Read PDF Data URL for downloadable brochure
  const pdfDataUrl = await new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });

  try {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const totalPages = pdfDoc.numPages;
    const pageImages = [];

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      if (progressCallback) progressCallback(pageNum, totalPages);

      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 }); // 1.5x scale for optimal crispness & speed

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      const imgDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      pageImages.push(imgDataUrl);
    }

    return {
      pdfUrl: pdfDataUrl,
      pdfName: file.name,
      pageImages
    };
  } catch (err) {
    console.error('PDF Page Rendering Error:', err);
    // Return PDF URL with empty pageImages if rendering failed
    return {
      pdfUrl: pdfDataUrl,
      pdfName: file.name,
      pageImages: []
    };
  }
}
