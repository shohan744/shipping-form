document.addEventListener('DOMContentLoaded', function() {
    // Initialize Signature Pad
    var canvas = document.getElementById('signatureCanvas');
    var signaturePad = new SignaturePad(canvas);

    // Adjust canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 100; // Adjust the height as needed

    // Clear signature button
    document.getElementById('clearSignature').addEventListener('click', function() {
        signaturePad.clear();
    });

    // Handle form submission
    var form = document.getElementById('shippingForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Initialize jsPDF
        var doc = new jsPDF();

        // Example: Adding static text. Adapt this part to include your actual form data.
        doc.text("Capitol Mailroom Shipping Form", 10, 10);
        // Here, you'd use doc.text() to add more of the form's data to the PDF

        // Check if the signature pad is not empty and add the signature to the PDF
        if (!signaturePad.isEmpty()) {
            var signatureDataUrl = signaturePad.toDataURL();
            doc.addImage(signatureDataUrl, 'PNG', 15, 40, 180, 60); // coordinates for adjusting position
        }

        // Save the generated PDF
        doc.save('shippingForm.pdf');

        // need AJAX for serverside processing
        // 
    });
});
