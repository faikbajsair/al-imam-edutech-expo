/**
 * Google Apps Script Backend for Al-Imam EduTech Virtual Expo
 * Handles Lead Submissions (doPost) and Product Inquiries (doGet)
 * Automatically writes to Google Spreadsheet as a database.
 */

// Configuration: You can set a default notification email if desired
var NOTIFICATION_EMAIL = "faikbajsair@gmail.com";

/**
 * Handle incoming POST requests from the Virtual Expo Frontend
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for other processes to finish
  try {
    lock.waitLock(30000);
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: "Server is busy. Please try again in a moment."
    });
  }

  try {
    var rawData;
    // Check if data is passed as postData contents (JSON) or parameter
    if (e.postData && e.postData.contents) {
      try {
        rawData = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        rawData = e.parameter;
      }
    } else {
      rawData = e.parameter || {};
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      // If script is not container-bound, create or get sheet by active user
      ss = SpreadsheetApp.create("Al-Imam EduTech Expo Leads");
    }
    
    var sheetName = "Leads";
    var sheet = ss.getSheetByName(sheetName);
    
    // Create sheet and header row if not exists
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = [
        "Timestamp",
        "Lead ID",
        "Full Name",
        "Institution / Company",
        "Email",
        "WhatsApp / Phone",
        "Interested Category / Product",
        "Selected Plan",
        "Estimated Budget",
        "Project Timeline",
        "Requirements / Message",
        "Lead Status"
      ];
      sheet.appendRow(headers);
      
      // Style headers: Navy background, White text, Bold
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // Format data fields
    var timestamp = new Date();
    var leadId = "LEAD-" + Utilities.formatDate(timestamp, "Asia/Jakarta", "yyyyMMdd-HHmmss") + "-" + Math.floor(1000 + Math.random() * 9000);
    var fullName = rawData.fullName || rawData.name || "N/A";
    var institution = rawData.institution || rawData.company || "N/A";
    var email = rawData.email || "N/A";
    var phone = rawData.phone || rawData.whatsapp || "N/A";
    var product = rawData.product || rawData.category || "General Inquiry";
    var selectedPlan = rawData.plan || "Custom Inquiry";
    var budget = rawData.budget || "Not Specified";
    var timeline = rawData.timeline || "Not Specified";
    var message = rawData.message || rawData.requirements || "";
    var status = "New Lead";

    // Append the row to Google Sheets
    sheet.appendRow([
      timestamp,
      leadId,
      fullName,
      institution,
      email,
      phone,
      product,
      selectedPlan,
      budget,
      timeline,
      message,
      status
    ]);

    // Optional: Send email notification to sales team
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.indexOf("@") > -1) {
      try {
        var subject = "🚀 [New Virtual Expo Lead] " + fullName + " - " + institution;
        var emailBody = "New Lead submitted from Al-Imam EduTech Virtual Expo:\n\n" +
          "Lead ID: " + leadId + "\n" +
          "Name: " + fullName + "\n" +
          "Institution: " + institution + "\n" +
          "Email: " + email + "\n" +
          "Phone/WA: " + phone + "\n" +
          "Category/Product: " + product + "\n" +
          "Selected Plan: " + selectedPlan + "\n" +
          "Budget: " + budget + "\n" +
          "Timeline: " + timeline + "\n" +
          "Requirements: " + message + "\n\n" +
          "Time: " + Utilities.formatDate(timestamp, "Asia/Jakarta", "dd MMM yyyy HH:mm:ss") + " WIB";
        
        MailApp.sendEmail(NOTIFICATION_EMAIL, subject, emailBody);
      } catch (mailErr) {
        Logger.log("Email notification error: " + mailErr.toString());
      }
    }

    return createJsonResponse({
      status: "success",
      message: "Lead successfully recorded in database.",
      leadId: leadId,
      timestamp: timestamp.toISOString()
    });

  } catch (err) {
    Logger.log("doPost Error: " + err.toString());
    return createJsonResponse({
      status: "error",
      message: err.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle incoming GET requests (Health check or data verification)
 */
function doGet(e) {
  return createJsonResponse({
    status: "online",
    service: "Al-Imam EduTech Expo API Backend",
    timestamp: new Date().toISOString(),
    documentation: "Send POST requests with lead data (fullName, institution, email, phone, product, budget, message)"
  });
}

/**
 * Helper to generate JSON response with proper CORS headers and MIME type
 */
function createJsonResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
