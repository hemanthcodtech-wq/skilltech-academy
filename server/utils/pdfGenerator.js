const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

/**
 * Helper to convert number to words for Indian Rupees
 */
function numberToWords(num) {
  if (!num || isNaN(num)) return 'Zero Rupees Only';
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees Only' : 'Rupees Only';
  return str.trim();
}

/**
 * Generate an Official Corporate / Institutional Tax Invoice PDF
 * @param {Object} data - { invoiceNumber, studentName, studentEmail, courseTitle, amountPaid, paymentDate, accessValidity }
 * @returns {Promise<Buffer>}
 */
const generateInvoicePDF = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 0 });
      const buffers = [];
      const brandBlue = '#1d4ed8';
      const brandBlueDark = '#0f172a';
      const brandGreen = '#059669';
      const brandLight = '#f8fafc';
      const darkText = '#0f172a';
      const mutedText = '#475569';

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      const logoCandidates = [
        path.join(__dirname, '../../client/public/logo.png'),
        path.join(__dirname, '../../client/src/assets/logo.png'),
        path.join(__dirname, '../assets/logo.png')
      ];
      const logoPath = logoCandidates.find(p => fs.existsSync(p));

      doc.rect(0, 0, 595, 842).fill(brandLight);
      doc.rect(0, 0, 595, 78).fill(brandBlueDark);
      doc.rect(0, 78, 595, 12).fill(brandBlue);
      doc.rect(0, 90, 595, 6).fill(brandGreen);

      const titleX = 42;
      if (logoPath) {
        try {
          doc.image(logoPath, titleX, 18, { width: 64, height: 64, fit: [64, 64] });
        } catch (e) {
          console.error('Logo image load error in invoice PDF:', e);
        }
      }

      doc.fillColor('#ffffff')
        .fontSize(24)
        .font('Helvetica-Bold')
        .text('SKILL TECH', titleX + 80, 18)
        .fontSize(20)
        .text('ACADEMY', titleX + 80, 46);

      doc.fillColor('#cbd5e1')
        .fontSize(8)
        .font('Helvetica')
        .text('Practical Digital Skills & Career-Focused Training', titleX + 80, 72);

      doc.roundedRect(390, 18, 165, 56, 12).fill('#0b234d');
      doc.fillColor('#ffffff')
        .fontSize(15)
        .font('Helvetica-Bold')
        .text('INVOICE', 425, 28, { width: 95, align: 'center' })
        .fontSize(9)
        .font('Helvetica')
        .text('PAID / CONFIRMED', 425, 49, { width: 95, align: 'center' });

      doc.roundedRect(40, 120, 515, 620, 18)
        .fill('#ffffff')
        .strokeColor('#dbeafe')
        .lineWidth(1)
        .stroke();

      doc.fillColor(brandBlueDark)
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('BILLED TO', 58, 138)
        .fontSize(9)
        .font('Helvetica')
        .fillColor(mutedText)
        .text(data.studentName || 'Learner Name', 58, 156)
        .text(data.studentEmail || 'student@example.com', 58, 170)
        .text('Registered Online Student', 58, 184)
        .text('India (INR)', 58, 198);

      doc.fillColor(brandBlueDark)
        .fontSize(10)
        .font('Helvetica-Bold')
        .text('PAYMENT DETAILS', 360, 138)
        .fontSize(8.5)
        .font('Helvetica')
        .fillColor(mutedText)
        .text(`Invoice No: ${data.invoiceNumber || 'skill-invoice-001'}`, 360, 156)
        .text(`Date: ${data.paymentDate || new Date().toLocaleDateString('en-IN')}`, 360, 170)
        .text('Place of Supply: Telangana (36)', 360, 184)
        .text('Mode: Razorpay / UPI / Netbanking', 360, 198);

      doc.moveTo(58, 224).lineTo(538, 224).strokeColor('#dbeafe').lineWidth(1).stroke();

      doc.rect(58, 236, 478, 26).fill(brandBlue);
      doc.fillColor('#ffffff')
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .text('#', 72, 244, { width: 18 })
        .text('PROGRAM / COURSE', 100, 244, { width: 200 })
        .text('VALIDITY', 335, 244, { width: 80, align: 'center' })
        .text('SAC', 430, 244, { width: 40, align: 'center' })
        .text('AMOUNT', 485, 244, { width: 40, align: 'right' });

      const tableRowY = 262;
      let validityText = '2 Months';
      if (data.accessValidity) {
        validityText = data.accessValidity.replace(/after completion/i, '').replace(/on-demand access/i, '').trim();
        if (!validityText.toLowerCase().includes('month') && !validityText.toLowerCase().includes('year')) {
          validityText += ' Access';
        }
      }

      doc.roundedRect(58, tableRowY, 478, 72, 10)
        .fill('#f8fafc')
        .strokeColor('#dbeafe')
        .lineWidth(1)
        .stroke();

      doc.fillColor('#0f172a')
        .fontSize(9)
        .font('Helvetica-Bold')
        .text('1', 72, tableRowY + 12, { width: 18 })
        .text(data.courseTitle || 'Live Digital Skills Program', 100, tableRowY + 12, { width: 200 })
        .fontSize(7.5)
        .font('Helvetica')
        .fillColor(mutedText)
        .text('Daily Zoom classes, notes, recordings, and dashboard access', 100, tableRowY + 28, { width: 200 })
        .fillColor('#0f172a')
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .text(validityText, 335, tableRowY + 20, { width: 80, align: 'center' })
        .text('999293', 430, tableRowY + 20, { width: 40, align: 'center' })
        .text(`Rs. ${data.amountPaid || 0}.00`, 485, tableRowY + 20, { width: 40, align: 'right' });

      doc.rect(58, 350, 275, 110).fill('#f8fafc').strokeColor('#dbeafe').stroke();
      doc.fillColor('#1e293b')
        .fontSize(8)
        .font('Helvetica-Bold')
        .text('AMOUNT IN WORDS', 72, 366)
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .fillColor(brandBlue)
        .text(numberToWords(data.amountPaid), 72, 382, { width: 240 })
        .fontSize(7.5)
        .font('Helvetica')
        .fillColor(mutedText)
        .text('Payment gateway: Razorpay / UPI / Netbanking', 72, 430)
        .text('Official learning service by Skill Tech Academy', 72, 440)
        .text('Digital access granted instantly after payment', 72, 450);

      doc.rect(356, 350, 180, 110).fill('#ffffff').strokeColor('#dbeafe').stroke();
      doc.fillColor(mutedText)
        .fontSize(8)
        .font('Helvetica')
        .text('Taxable Subtotal:', 368, 368)
        .text(`Rs. ${data.amountPaid || 0}.00`, 468, 368, { width: 52, align: 'right' })
        .text('CGST (0%):', 368, 382)
        .text('Rs. 0.00', 468, 382, { width: 52, align: 'right' })
        .text('SGST (0%):', 368, 396)
        .text('Rs. 0.00', 468, 396, { width: 52, align: 'right' });

      doc.rect(356, 410, 180, 50).fill('#ecfdf5').strokeColor('#86efac').stroke();
      doc.fillColor('#166534')
        .fontSize(8)
        .font('Helvetica-Bold')
        .text('TOTAL PAID', 370, 424)
        .fontSize(15)
        .text(`Rs. ${data.amountPaid || 0}.00`, 468, 420, { width: 52, align: 'right' });

      doc.rect(58, 482, 478, 120).fill('#fffdf7').strokeColor('#dbeafe').stroke();
      doc.fillColor('#b45309')
        .fontSize(8)
        .font('Helvetica-Bold')
        .text('IMPORTANT LEARNER NOTE', 72, 498)
        .fontSize(7.5)
        .font('Helvetica')
        .fillColor(mutedText)
        .text('• Live Zoom links, timetable, notes, and recordings are instantly available in your dashboard.', 72, 516)
        .text('• Course access and learning materials remain active for the paid validity period.', 72, 528)
        .text('• Certificate of Completion is issued after successful completion of all course sessions.', 72, 540)
        .text('• Support: support@skilltechacademy.online | skill-tech-academy.vercel.app', 72, 564);

      doc.rect(58, 618, 188, 66).fill('#eff6ff').strokeColor(brandBlue).stroke();
      doc.fillColor(brandBlue)
        .fontSize(8)
        .font('Helvetica-Bold')
        .text('DIGITALLY VERIFIED', 68, 632, { width: 170, align: 'center' })
        .fontSize(7)
        .font('Helvetica')
        .text('Skill Tech Academy Certified', 68, 646, { width: 170, align: 'center' })
        .text(`Hash: ${Buffer.from(data.invoiceNumber || 'SDF').toString('hex').slice(0, 16).toUpperCase()}`, 68, 658, { width: 170, align: 'center' });

      doc.moveTo(290, 650).lineTo(535, 650).strokeColor('#475569').lineWidth(1).stroke();
      doc.fillColor('#0f172a')
        .fontSize(14)
        .font('Times-BoldItalic')
        .text('Skill Tech Academy', 290, 628, { width: 200, align: 'center' });

      doc.fillColor(mutedText)
        .fontSize(8)
        .font('Helvetica-Bold')
        .text('Authorized Finance Controller', 290, 656, { width: 200, align: 'center' })
        .fontSize(7)
        .font('Helvetica')
        .text('Accounts Department', 290, 668, { width: 200, align: 'center' });

      doc.fillColor('#94a3b8')
        .fontSize(7)
        .font('Helvetica')
        .text('This is an authentic system-generated invoice issued by Skill Tech Academy. No physical signature is required.', 58, 785, { width: 480, align: 'center' })
        .text('support@skilltechacademy.online • skill-tech-academy.vercel.app • All Rights Reserved © 2026', 58, 796, { width: 480, align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate a High-Resolution PDF Certificate of Completion with the Skill Tech Academy template,
 * Recipient Script Typography, Dynamic Course Title, Sidebar Metadata, and Instructor Details (No Signature).
 * @param {Object} data - { studentName, courseTitle, completionDate, certificateId, studentId, instructorName, instructorTitle, instructorSubtitle, category, level, duration }
 * @returns {Promise<Buffer>}
 */
const generateCertificatePDF = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const templatePath = path.join(__dirname, '../../client/public/certificate_template.png');
      const doc = new PDFDocument({ size: [842, 561.33], margin: 0 });
      const buffers = [];
      const width = doc.page.width;
      const height = doc.page.height;

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      const studentName = data.studentName || 'Learner Name';
      const nameLength = studentName.length;
      const scriptSize = nameLength > 26 ? 34 : (nameLength > 18 ? 42 : 48);
      const fontCandidates = [
        path.join(__dirname, '../assets/fonts/AlexBrush-Regular.ttf'),
        path.join(__dirname, '../assets/fonts/GreatVibes-Regular.ttf')
      ];
      const scriptFontPath = fontCandidates.find(p => fs.existsSync(p));
      let scriptFont = 'Times-BoldItalic';
      if (scriptFontPath) {
        doc.registerFont('CertificateScriptFont', scriptFontPath);
        scriptFont = 'CertificateScriptFont';
      }

      if (!fs.existsSync(templatePath)) {
        throw new Error(`Certificate template not found: ${templatePath}`);
      }

      doc.image(templatePath, 0, 0, { width, height });
      doc.fillColor('#0f172a')
        .font(scriptFont)
        .fontSize(scriptSize)
        .text(studentName, 170, 240, { width: 505, align: 'center' });

      const courseTitle = data.courseTitle || 'Digital Skills & Career Development Program';
      const courseFontSize = courseTitle.length > 48 ? 12 : (courseTitle.length > 32 ? 14 : 16);
      doc.fillColor('#0f172a')
        .fontSize(courseFontSize)
        .font('Helvetica-Bold')
        .text(courseTitle, 230, 326, { width: 382, align: 'center', lineBreak: false });

      const issueDate = data.completionDate || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      const certId = data.certificateId || `skill-cert-${Date.now().toString().slice(-8)}`;

      doc.fillColor('#0f172a')
        .fontSize(9)
        .font('Helvetica-Bold')
        .text(certId, 35, 481, { width: 165, align: 'center', lineBreak: false })
        .fontSize(8)
        .text(issueDate, 645, 500, { width: 150, align: 'center', lineBreak: false });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  generateInvoicePDF,
  generateCertificatePDF
};
