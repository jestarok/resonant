var ses_mail = "From: 'Resonant Marketplace' < $email >\n";
ses_mail = ses_mail + 'To: $email \n';
ses_mail = ses_mail + 'Subject: Product Information: $productName\n';
ses_mail = ses_mail + 'MIME-Version: 1.0\n';
ses_mail = ses_mail + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
ses_mail = ses_mail + '--NextPart\n';
ses_mail = ses_mail + 'Content-Type: text/html; charset=us-ascii\n\n';
ses_mail = ses_mail + 'Here are some details on $productName.<br>\t\n';
ses_mail = ses_mail + 'Name: $productName.<br>\t\n';
ses_mail = ses_mail + 'Type: $productType.<br>\t\n';
ses_mail = ses_mail + 'Unit Cost: $productCost.<br>\n';
ses_mail = ses_mail + 'Dimensions: $productDimensions.<br>\t\n';
ses_mail = ses_mail + 'Materials: $productMaterials.<br><br>\t\n';
ses_mail = ses_mail + '$Designer';
ses_mail = ses_mail + '--NextPart\n';
ses_mail = ses_mail + 'Content-Type: text/plain;\n';

var ses_mail_designer_details =
  "A little bit about the product's designer, $designerName.<br>\t\n";
var ses_mail_designer_details =
  ses_mail_designer_details + '$designerBackground.<br>\t\n';

module.exports = Object.freeze({
  PRODUCT_INFO: ses_mail,
  DESIGNER_INFO: ses_mail_designer_details,
});
