window.onload = function() {
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

        // Add form data to the PDF
        doc.text("Capitol Mailroom Shipping Form", 10, 10);
        doc.text("From:", 10, 20);
        doc.text("Postage Account: " + document.getElementById('postageAccount').value, 20, 30);

        doc.text("To:", 10, 50);
        doc.text("Name: " + document.getElementById('name').value, 20, 60);
        doc.text("Company: " + document.getElementById('company').value, 20, 70);
        doc.text("Address: " + document.getElementById('address').value, 20, 80);
        doc.text("City: " + document.getElementById('city').value, 20, 90);
        doc.text("State: " + document.getElementById('state').value, 20, 100);
        doc.text("Zip: " + document.getElementById('zip').value, 20, 110);
        doc.text("Phone: " + document.getElementById('phone').value, 20, 120);

        doc.text("Package Info:", 10, 140);
        doc.text("Arrive By: " + document.getElementById('arriveBy').value, 20, 150);
        var selectedCarrier = document.querySelector('input[name="carrier"]:checked').value;
        doc.text("Preferred Carrier: " + selectedCarrier, 20, 160);
        var hasBatteries = document.querySelector('input[name="batteries"]:checked').value;
        doc.text("Batteries: " + hasBatteries, 20, 170);

        // Check if the signature pad is not empty and add the signature to the PDF
        if (!signaturePad.isEmpty()) {
            var signatureDataUrl = signaturePad.toDataURL();
            doc.addImage(signatureDataUrl, 'PNG', 20, 190, 180, 60); // coordinates for adjusting position
        }

        // Save the generated PDF
        doc.save('shippingForm.pdf');

        // need AJAX for serverside processing
    });
});
};
