import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generates and downloads a professional Executive PDF Briefing Report using jsPDF
 * @param {Object} reportData - Data object containing report details
 */
export const generatePdfReport = (reportData) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const reportTitle = reportData?.title || 'Q3 Executive Capital Allocation & Risk Audit';
    const reportId = reportData?.id || 'REP-2026-Q3';
    const generatedDate = reportData?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const confidenceScore = reportData?.confidence || '96.8%';
    const roi = reportData?.roi || '+38.4%';
    const riskLevel = reportData?.risk || 'Low Risk (P95)';
    const payback = reportData?.payback || '14.2 Months';
    const summary = reportData?.summary || 'Comprehensive executive audit evaluating multi-vector capital allocation across Tier-1 technology nodes, real estate tax subsidies, and P95 Monte Carlo risk variance bounds.';
    
    const recommendations = reportData?.recommendations || [
      'Finalize LOI prior to Q3 municipal fiscal deadline to capture 18% tax credit.',
      'Allocate $1.8M CapEx for initial hardware node deployment in Hyderabad Hitec City.',
      'Establish regional R&D hub to capture senior Machine Learning engineering talent density.',
      'Execute secondary air-freight contingency contract for top 20% critical component SKUs.'
    ];

    // Colors
    const primaryColor = [108, 99, 255]; // #6C63FF
    const pinkAccent = [255, 45, 170];  // #FF2DAA
    const darkText = [15, 23, 42];     // #0F172A
    const secondaryText = [100, 116, 139]; // #64748B
    const bgLight = [248, 247, 252];  // #F8F7FC

    // 1. Header Banner
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 24, 'F');

    // Logo & Brand Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('DecisionSphere AI', 14, 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('AI-POWERED DECISION INTELLIGENCE PLATFORM', 14, 18);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('CONFIDENTIAL EXECUTIVE BRIEFING', 145, 13);
    doc.setFont('helvetica', 'normal');
    doc.text(`DATE: ${generatedDate}`, 145, 18);

    // 2. Report Identifier & Title
    let y = 36;
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`REPORT ID: ${reportId}`, 14, y);

    y += 7;
    doc.setTextColor(...darkText);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    
    // Split title if too long
    const titleLines = doc.splitTextToSize(reportTitle, 180);
    doc.text(titleLines, 14, y);
    y += (titleLines.length * 8) + 4;

    // Divider Line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(14, y, 196, y);
    y += 8;

    // 3. Key Metrics Table / Cards
    doc.setTextColor(...darkText);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Key Executive Metrics', 14, y);
    y += 6;

    autoTable(doc, {
      startY: y,
      head: [['Confidence Score', 'Expected ROI', 'Risk Classification', 'Payback Period']],
      body: [[confidenceScore, roi, riskLevel, payback]],
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
        halign: 'center',
      },
      bodyStyles: {
        textColor: darkText,
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center',
        cellPadding: 4,
      },
      alternateRowStyles: {
        fillColor: [248, 247, 252],
      },
      margin: { left: 14, right: 14 },
    });

    y = doc.lastAutoTable.finalY + 12;

    // 4. Executive Summary Section
    doc.setTextColor(...darkText);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Executive Summary', 14, y);
    y += 6;

    doc.setFillColor(...bgLight);
    doc.roundedRect(14, y, 182, 24, 3, 3, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, y, 182, 24, 3, 3, 'S');

    doc.setTextColor(...secondaryText);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const summaryLines = doc.splitTextToSize(summary, 174);
    doc.text(summaryLines, 18, y + 7);

    y += 32;

    // 5. Strategic Recommendations List
    doc.setTextColor(...darkText);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Strategic Action Recommendations', 14, y);
    y += 6;

    const recsTableBody = recommendations.map((rec, index) => [
      `0${index + 1}`,
      rec
    ]);

    autoTable(doc, {
      startY: y,
      head: [['#', 'Recommended Action']],
      body: recsTableBody,
      theme: 'striped',
      headStyles: {
        fillColor: [108, 99, 255],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      columnStyles: {
        0: { cellWidth: 14, fontStyle: 'bold', halign: 'center' },
        1: { fontSize: 9.5, fontStyle: 'normal' },
      },
      bodyStyles: {
        textColor: darkText,
        cellPadding: 4.5,
      },
      margin: { left: 14, right: 14 },
    });

    y = doc.lastAutoTable.finalY + 12;

    // 6. Security & Audit Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Bottom border line
      doc.setDrawColor(226, 232, 240);
      doc.line(14, 282, 196, 282);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...secondaryText);
      doc.text('© 2026 DecisionSphere AI, Inc. SOC2 Type II Certified Audit.', 14, 287);
      doc.text(`Page ${i} of ${pageCount}`, 175, 287);
    }

    // 7. Sanitize filename & trigger download
    const cleanFileName = reportTitle
      .replace(/[^a-[#6C63FF]0-9]/gi, '_')
      .replace(/_+/g, '_')
      .substring(0, 50);
    
    const fileName = `${cleanFileName}.pdf`;
    doc.save(fileName);
    return true;

  } catch (err) {
    console.error('Error generating PDF report:', err);
    throw err;
  }
};
