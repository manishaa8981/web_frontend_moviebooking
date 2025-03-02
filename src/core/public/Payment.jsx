import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import React, { useState } from "react";

const PaymentPage = ({
  movieName = "Bhool Bhuliya 3",
  showtime = "Today, 7:00 PM",
  hall = "IMAX Threatre",
  seats = ["B1", "B2"],
  totalAmount = 600,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate payment processing
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsPaymentComplete(true);
    }, 2000);
  };

  // Generate ticket PDF
  const generateTicket = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([350, 500]);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
      );

      // Add movie details
      page.drawText("MOVIE TICKET", {
        x: 120,
        y: 450,
        size: 20,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Movie: ${movieName}`, {
        x: 50,
        y: 400,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Show Time: ${showtime}`, {
        x: 50,
        y: 380,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Threater: ${hall}`, {
        x: 50,
        y: 360,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Seats: ${seats.join(", ")}`, {
        x: 50,
        y: 340,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Amount Paid: Rs.${totalAmount}`, {
        x: 50,
        y: 320,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Generate QR code
      const qrData = `Movie: ${movieName}, Seats: ${seats.join(
        ", "
      )}, Time: ${showtime}`;
      const qrCodeDataUrl = await QRCode.toDataURL(qrData);

      // Convert QR code to format for PDF
      const qrImage = await pdfDoc.embedPng(qrCodeDataUrl);
      const qrDims = qrImage.scale(0.5);

      // Draw the QR code
      page.drawImage(qrImage, {
        x: page.getWidth() / 2 - qrDims.width / 2,
        y: 150,
        width: qrDims.width,
        height: qrDims.height,
      });

      page.drawText("Scan this QR code at the entrance", {
        x: 70,
        y: 120,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Finalize the PDF
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF data
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `movie-ticket-${seats.join("-")}.pdf`;

      // Click the link to start the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating ticket:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-700  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-neutral-600 rounded-lg shadow-lg overflow-hidden">
        {!isPaymentComplete ? (
          <div>
            <div className="px-6 py-4 bg-orange-500">
              <h2 className="text-2xl font-bold text-white">Payment Details</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Order Summary
                </h3>
                <div className="bg-neutral-500 p-4 rounded-md">
                  <div className="flex  text-white justify-between mb-2">
                    <span>Movie:</span>
                    <span className="font-medium  text-white">{movieName}</span>
                  </div>
                  <div className="flex  text-white justify-between mb-2">
                    <span>Show Time:</span>
                    <span className="font-medium  text-white">{showtime}</span>
                  </div>
                  <div className="flex  text-white justify-between mb-2">
                    <span>Seats:</span>
                    <span className="font-medium">{seats.join(", ")}</span>
                  </div>
                  <div className="flex   text-white justify-between font-semibold text-lg border-t pt-2 mt-2">
                    <span>Total:</span>
                    <span>Rs.{totalAmount}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block  text-white text-sm font-bold mb-2"
                    htmlFor="cardNumber"
                  >
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength={19}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block  text-white text-sm font-bold mb-2"
                    htmlFor="cardName"
                  >
                    Card Holder Name
                  </label>
                  <input
                    id="cardName"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>

                <div className="flex mb-4">
                  <div className="w-1/2 mr-2">
                    <label
                      className="block  text-white text-sm font-bold mb-2"
                      htmlFor="expiryDate"
                    >
                      Expiry Date
                    </label>
                    <input
                      id="expiryDate"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) =>
                        setExpiryDate(formatExpiryDate(e.target.value))
                      }
                      maxLength={5}
                      required
                    />
                  </div>

                  <div className="w-1/2 ml-2">
                    <label
                      className="block  text-white text-sm font-bold mb-2"
                      htmlFor="cvv"
                    >
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="***"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      maxLength={3}
                      required
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold ${
                      isLoading
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex justify-center items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay Rs.${totalAmount}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="rounded-full bg-green-100 w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold  text-white mb-2">
              Payment Successful!
            </h3>
            <p className=" text-white mb-6">
              Your tickets for {movieName} have been booked successfully.
            </p>

            <button
              onClick={generateTicket}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
            >
              Download Ticket
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
