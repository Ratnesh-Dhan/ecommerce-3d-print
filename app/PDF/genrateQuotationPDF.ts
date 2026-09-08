import { jsPDF } from "jspdf";

type GenerateQuotationPDFProps = {
    form: any;
    weight: any;
    material: any;
    color: any;
    quantity: any;
    shipping: any;
    infill: any;
    estimatedPrice: any;
    fileName: any;
    stlFile: any;

    showDelivery: boolean;

    getMaterialLabel: (m: any) => string;
    getShippingLabel: (s: any) => string;
};

// ─── Color Palette ────────────────────────────────────────────────────────────
const C = {
    black: [10, 10, 10] as [number, number, number],
    darkGrey: [30, 30, 30] as [number, number, number],
    midGrey: [70, 70, 70] as [number, number, number],
    lightGrey: [180, 180, 180] as [number, number, number],
    offWhite: [248, 246, 240] as [number, number, number],
    white: [255, 255, 255] as [number, number, number],
    gold: [212, 175, 55] as [number, number, number],   // Classic gold
    goldLight: [234, 205, 100] as [number, number, number],
    goldDark: [160, 120, 20] as [number, number, number],
    accentBlue: [30, 58, 138] as [number, number, number],   // Deep navy accent
    rowAlt: [250, 248, 240] as [number, number, number],   // Warm tinted row
};

// ─── Rupee-safe font (₹ support) ───────────────────────────────────────────
// jsPDF's built-in "helvetica" (and times/courier) fonts use WinAnsiEncoding,
// which has NO glyph for the Indian Rupee sign (₹, U+20B9) — drawing it with
// helvetica silently drops the character instead of printing it. The base64
// below is a ~3.7KB subset of DejaVu Sans (Bitstream Vera-derived, freely
// embeddable font) containing ONLY the glyphs needed to show "₹": .notdef,
// space, and the rupee glyph itself. It's registered on the doc once per
// PDF and used *only* for the ₹ character via textWithRupee() below — every
// other character keeps rendering in Helvetica exactly as it did before.
const RUPEE_FONT_NAME = "RupeeSymbol";
const RUPEE_FONT_BASE64 =
    "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Ax4dDQUeZAMdDQMcEUIFHP4DG/oDGkIDGRFCBRn+AxhkAxcWGQUX/gMWARAFFhkDFf4DFP4DE/4DEhFCBRL+AxECLQURQgMQfQMPZAMO/gMNDBYFDf4DDAEQBQwWAwv+AwoQAwn+AwgCLQUI/gMHFAMGZAMEARAFBP4DQBUDAi0FA/4DAgEQBQItAwEQAwD+AwG4AWSFjQErKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysAKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKx0BNQC4AMsAywDBAKoAnAGmALgAZgAAAHEAywCgArIAhQB1ALgAwwHLAYkCLQDLAKYA8ADTAKoAhwDLA6oEAAFKADMAywAAANkFAgD0AVQAtACcATkBFAE5BwYEAAROBLQEUgS4BOcEzQA3BHMEzQRgBHMBMwOiBVYFpgVWBTkDxQISAMkAHwC4Ad8AcwC6A+kDMwO8BEQEDgDfA80DqgDlA6oEBAAAAMsAjwCkAHsAuAAUAW8AfwJ7AlIAjwDHBc0AmgCaAG8AywDNAZ4B0wDwALoBgwDVAJgDBAJIAJ4B1QDBAMsA9gCDA1QCfwAAAzMCZgDTAMcApADNAI8AmgBzBAAF1QEKAP4CKwCkALQAnAAAAGIAnAAAAB0DLQXVBdUF1QXwAH8AewBUAKQGuAYUByMB0wC4AMsApgHDAewGkwCgANMDXANxA9sBhQQjBKgESACPATkBFAE5A2AAjwXVAZoGFAcjBmYBeQRgBGAEYAR7AJwAAAJ3BGABqgDpBGAHYgB7AMUAfwJ7AAAAtAJSBc0AZgC8AGYAdwYQAM0BOwGFA4kAjwB7AAAAHQDNB0oELwCcAJwAAAd9AG8AAABvAzUAagBvAHsArgCyAC0DlgCPAnsA9gCDA1QGNwX2AI8AnAThAmYAjwGNAvYAzQNEACkAZgTuAHMAABQAAJYAAAAAAAcAWgADAAEECQAAATAAAAADAAEECQABABYBMAADAAEECQACAAgBRgADAAEECQADABYBMAADAAEECQAEABYBMAADAAEECQAFABgBTgADAAEECQAGABQBZgBDAG8AcAB5AHIAaQBnAGgAdAAgACgAYwApACAAMgAwADAAMwAgAGIAeQAgAEIAaQB0AHMAdAByAGUAYQBtACwAIABJAG4AYwAuACAAQQBsAGwAIABSAGkAZwBoAHQAcwAgAFIAZQBzAGUAcgB2AGUAZAAuAAoAQwBvAHAAeQByAGkAZwBoAHQAIAAoAGMAKQAgADIAMAAwADYAIABiAHkAIABUAGEAdgBtAGoAbwBuAGcAIABCAGEAaAAuACAAQQBsAGwAIABSAGkAZwBoAHQAcwAgAFIAZQBzAGUAcgB2AGUAZAAuAAoARABlAGoAYQBWAHUAIABjAGgAYQBuAGcAZQBzACAAYQByAGUAIABpAG4AIABwAHUAYgBsAGkAYwAgAGQAbwBtAGEAaQBuAAoARABlAGoAYQBWAHUAIABTAGEAbgBzAEIAbwBvAGsAVgBlAHIAcwBpAG8AbgAgADIALgAzADcARABlAGoAYQBWAHUAUwBhAG4AcwACAAAAAAAA/9gAWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAADAQIHdW5pMjBCOQAAAAIACAAC//8AAwABAAAADAAAAAAAAAABAAEAAgABAAEAAAABAAAACgAcAB4AAURGTFQACAAEAAAAAP//AAAAAAAAAAEAAAAKAJIAlAAUREZMVAB6YXJhYgCEYXJtbgCEYnJhaQCEY2FucwCEY2hlcgCEY3lybACEZ2VvcgCEZ3JlawCEaGFuaQCEaGVicgCEa2FuYQCEbGFvIACEbGF0bgCEbWF0aACEbmtvIACEb2dhbQCEcnVucgCEdGZuZwCEdGhhaQCEAAQAAAAA//8AAAAAAAAAAAAAAAAAAQAAAAoA4ADoAFAAPAwAB90AAAAAAoIAAARgAAAF1QAAAAAAAARgAAAAAAAAAAAAAAAAAAAEYAAAAAAAAAFoAAAEYAAAAFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ4AAAJ2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaAAABDgAAAFoAAABaAAABDgAAAAAAAAAAAAABDgAAAFoAAABaAAABDgAAAFoAAABaAAAAWgAAAXIAAABaAAAAWgAAAjgAAPuPAAAAPAAAAAAAAAAAACgACgAKAAAAAAABAAAAAA==";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Load any image URL (or public path) as base64 for jsPDF */
async function fetchImageAsBase64(src: string): Promise<string> {
    const res = await fetch(src);
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/** Draw a rounded rectangle (jsPDF native rect doesn't support radius well) */
function roundedRect(
    doc: jsPDF,
    x: number, y: number, w: number, h: number,
    r: number,
    style: "F" | "S" | "FD" = "F"
) {
    doc.roundedRect(x, y, w, h, r, r, style);
}

/** Draw a thin horizontal rule */
function rule(doc: jsPDF, x1: number, y: number, x2: number, color = C.gold) {
    doc.setDrawColor(...color);
    doc.setLineWidth(0.4);
    doc.line(x1, y, x2, y);
}

/** Draw a section heading with left gold bar + underline */
function sectionHeading(doc: jsPDF, label: string, x: number, y: number) {
    // Gold left bar
    doc.setFillColor(...C.gold);
    doc.rect(x, y - 4, 3, 6, "F");
    // Label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...C.darkGrey);
    doc.text(label, x + 6, y);
    // Underline
    rule(doc, x + 6, y + 1.5, 190, C.lightGrey);
}

/**
 * Draws `text` at (x, y) in `font`/`style`, except any "₹" in it, which is
 * drawn with RUPEE_FONT_NAME instead — the only font here that actually has
 * that glyph. Size, color and alignment behave exactly like a normal
 * doc.text() call. Strings with no "₹" just fall through to doc.text().
 */
function textWithRupee(
    doc: jsPDF,
    text: string,
    x: number,
    y: number,
    font: string,
    style: "normal" | "bold",
    align: "left" | "right" = "left"
) {
    if (!text.includes("₹")) {
        doc.setFont(font, style);
        doc.text(text, x, y, { align });
        return;
    }

    // Split into "₹" runs vs everything else, so only the symbol itself
    // borrows the Rupee font — the digits around it stay in helvetica.
    const parts = text.split(/(₹)/g).filter((part) => part.length > 0);

    const widthOf = (part: string) => {
        const isRupee = part === "₹";
        doc.setFont(isRupee ? RUPEE_FONT_NAME : font, isRupee ? "normal" : style);
        return doc.getTextWidth(part);
    };

    // Right-aligned text needs the total width up front to know where the
    // first segment should start.
    const totalWidth = parts.reduce((sum, part) => sum + widthOf(part), 0);
    let cursorX = align === "right" ? x - totalWidth : x;

    parts.forEach((part) => {
        const isRupee = part === "₹";
        doc.setFont(isRupee ? RUPEE_FONT_NAME : font, isRupee ? "normal" : style);
        doc.text(part, cursorX, y);
        cursorX += doc.getTextWidth(part);
    });

    // Leave the doc on the caller's requested font so any unrelated
    // doc.text() call right after this one doesn't inherit RUPEE_FONT_NAME.
    doc.setFont(font, style);
}

/** Table row helper */
function tableRow(
    doc: jsPDF,
    label: string,
    value: string,
    y: number,
    isAlt: boolean
) {
    const rowH = 8;
    if (isAlt) {
        doc.setFillColor(...C.rowAlt);
        doc.rect(20, y - 5.5, 170, rowH, "F");
    }
    doc.setFontSize(9);
    doc.setTextColor(...C.midGrey);
    textWithRupee(doc, label, 24, y, "helvetica", "normal");
    doc.setTextColor(...C.darkGrey);
    textWithRupee(doc, value, 110, y, "helvetica", "bold");
}

// ─── Main export ──────────────────────────────────────────────────────────────

export const generateQuotationPDF = async ({
    form,
    weight,
    material,
    color,
    quantity,
    shipping,
    infill,
    estimatedPrice,
    fileName,
    stlFile,
    showDelivery,
    getMaterialLabel,
    getShippingLabel,
}: GenerateQuotationPDFProps) => {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    // Register the ₹-only font on this doc instance (see RUPEE_FONT_BASE64
    // above). Cheap — the embedded subset is ~3.7KB — and must happen once
    // per PDF, before any textWithRupee() call below.
    doc.addFileToVFS(`${RUPEE_FONT_NAME}.ttf`, RUPEE_FONT_BASE64);
    doc.addFont(`${RUPEE_FONT_NAME}.ttf`, RUPEE_FONT_NAME, "normal");

    const pageW = 210;
    const pageH = 297;

    // ─── Quote Meta ──────────────────────────────────────────────────────────
    const quoteNo = `TD-${Date.now().toString().slice(-6)}`;
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
        today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;

    // ─── Fetch logo ONCE – reused for both watermark and header ────────────
    // Using logo.jpg (~370 KB) instead of main-logo.png (~2.8 MB) for speed.
    let logoB64: string | null = null;
    try {
        logoB64 = await fetchImageAsBase64("/images/logo.jpg");
    } catch (_) {
        // Logo unavailable – continue without it
    }

    // ─── WATERMARK (behind everything) ──────────────────────────────────────
    if (logoB64) {
        doc.saveGraphicsState();
        doc.setGState(new (doc as any).GState({ opacity: 0.08 }));
        doc.addImage(logoB64, "JPEG", 42, 90, 126, 110);
        doc.restoreGraphicsState();
    }

    // ─── HEADER BACKGROUND ───────────────────────────────────────────────────
    // Dark base
    doc.setFillColor(...C.black);
    doc.rect(0, 0, pageW, 50, "F");

    // Gold bottom stripe on header
    doc.setFillColor(...C.gold);
    doc.rect(0, 46, pageW, 1.8, "F");

    // ─── LOGO in header ──────────────────────────────────────────────────────
    if (logoB64) {
        doc.setFillColor(...C.white);
        roundedRect(doc, 12, 4, 40, 40, 3, "F");
        doc.addImage(logoB64, "JPEG", 13, 5, 38, 38);
    }

    // Company name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...C.gold);
    doc.text("THREEDITRON", 58, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...C.lightGrey);
    doc.text("Online 3D Printing & Rapid Prototyping Services", 58, 25);
    doc.text("Jamshedpur, Jharkhand, India", 58, 31);
    doc.text("Phone: +91 7209827299  |  threeditron.com", 58, 37);

    // Quotation badge (right side of header)
    doc.setFillColor(...C.gold);
    roundedRect(doc, 135, 8, 62, 30, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...C.black);
    doc.text("QUOTATION", 145, 16);
    doc.setFontSize(11);
    doc.text(quoteNo, 145, 23);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`Date: ${formattedDate}`, 145, 30);

    // ─── DOCUMENT TITLE ──────────────────────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...C.darkGrey);
    doc.text("3D PRINTING QUOTATION", pageW / 2, 60, { align: "center" });

    rule(doc, 20, 63, 190, C.gold);
    rule(doc, 20, 64.2, 190, C.goldLight);

    // ─── CUSTOMER DETAILS ────────────────────────────────────────────────────
    let yPos = 74;
    sectionHeading(doc, "CUSTOMER DETAILS", 20, yPos);
    yPos += 8;

    const customerRows: [string, string][] = [
        ["Name", form.name || "N/A"],
        ["Phone", form.phone || "N/A"],
        ["Email", form.email || "N/A"],
    ];

    if (showDelivery) {
        const addr = [form.address, form.city, form.state, form.pincode]
            .filter(Boolean)
            .join(", ");
        customerRows.push(["Delivery Address", addr || "N/A"]);
    }

    customerRows.forEach(([label, value], i) => {
        tableRow(doc, label, value, yPos, i % 2 === 0);
        yPos += 8;
    });

    yPos += 4;

    // ─── 3D MODEL SPECIFICATIONS ─────────────────────────────────────────────
    sectionHeading(doc, "3D MODEL SPECIFICATIONS", 20, yPos);
    yPos += 8;

    const specRows: [string, string][] = [
        ["File Name", fileName || stlFile?.name || "N/A"],
        ["Estimated Weight", `${weight || 0} grams`],
        ["Material", getMaterialLabel(material)],
        ["Infill Density", `${Number(infill) * 10}%`],
        ["Color", color || "N/A"],
        ["Quantity", `${quantity || 1} unit(s)`],
        ["Shipping Mode", getShippingLabel(shipping)],
    ];

    specRows.forEach(([label, value], i) => {
        tableRow(doc, label, value, yPos, i % 2 === 0);
        yPos += 8;
    });

    yPos += 4;

    // // ─── PRICE BREAKDOWN ─────────────────────────────────────────────────────
    // sectionHeading(doc, "PRICE BREAKDOWN", 20, yPos);
    // yPos += 8;

    // // Material rates per gram
    // const materialRates: Record<string, number> = {
    //     PLA: 10, ABS: 15, TPU: 25, PETG: 40,
    // };
    // const materialLabel = getMaterialLabel(material);
    // const materialName = materialLabel.split(" ")[0];
    // const modelWeight = Number(weight) || 0;
    // const materialCost = modelWeight * (materialRates[materialName] || 0);
    // const finalTotal = Number(estimatedPrice) || 0;

    // const priceRows: [string, string][] = [
    //     ["Base Material Printing Cost", `₹${materialCost.toFixed(2)}`],
    //     ["Infill, Quantity & Shipping", "Included in total"],
    // ];

    // priceRows.forEach(([label, value], i) => {
    //     tableRow(doc, label, value, yPos, i % 2 === 0);
    //     yPos += 8;
    // });

    // yPos += 2;

    // // Total Amount highlighted box
    // doc.setFillColor(...C.black);
    // roundedRect(doc, 20, yPos, 170, 14, 3, "F");
    // doc.setFillColor(...C.gold);
    // roundedRect(doc, 20, yPos, 4, 14, 2, "F");

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(11);
    // doc.setTextColor(...C.goldLight);
    // doc.text("TOTAL AMOUNT (incl. all charges):", 28, yPos + 9);

    // doc.setFontSize(13);
    // doc.setTextColor(...C.gold);
    // doc.text(`₹${finalTotal.toFixed(2)}`, 180, yPos + 9, { align: "right" });

    // yPos += 22;

    // ─── PRICE BREAKDOWN ─────────────────────────────────────────────────────

    sectionHeading(doc, "PRICE BREAKDOWN", 20, yPos);
    yPos += 8;


    // Material rates per gram
    const materialRates: Record<string, number> = {
        PLA: 10,
        ABS: 15,
        TPU: 25,
        PETG: 40,
    };


    const materialLabel = getMaterialLabel(material);
    const materialName = materialLabel.split(" ")[0];

    const modelWeight = Number(weight) || 0;
    const modelQuantity = Number(quantity) || 1;


    // Material cost
    const baseMaterialCost =
        modelWeight *
        (materialRates[materialName] || 0);


    // Infill calculation
    const infillMultiplier: Record<number, number> = {
        1: 0,
        2: 0.1,
        3: 0.3,
        4: 0.4,
        5: 0.5,
        6: 0.6,
        7: 0.7,
        8: 0.8,
        9: 0.9,
        10: 1,
    };


    const infillAdjustment =
        baseMaterialCost *
        (infillMultiplier[Number(infill)] || 0);


    // Quantity cost
    const quantityCost =
        (baseMaterialCost + infillAdjustment) *
        (modelQuantity - 1);


    // Shipping calculation
    const shippingMultiplier: Record<number, number> = {
        1: 0,
        2: 0.5,
        3: 1,
    };

    const infill_quantity_shipping = infillAdjustment + quantityCost + shippingMultiplier[Number(shipping)];


    const subtotal =
        (baseMaterialCost + infillAdjustment) *
        modelQuantity;


    const shippingCost =
        subtotal *
        (shippingMultiplier[Number(shipping)] || 0);


    // Final total
    const finalTotal = Number(estimatedPrice) || 0;



    // const priceRows: [string, string][] = [
    //     [
    //         "Base Material Printing Cost",
    //         `₹${baseMaterialCost.toFixed(2)}`
    //     ],

    //     [
    //         "Infill Adjustment",
    //         `₹${infillAdjustment.toFixed(2)}`
    //     ],

    //     [
    //         "Quantity Adjustment",
    //         `₹${quantityCost.toFixed(2)}`
    //     ],

    //     [
    //         "Shipping Charges",
    //         `₹${shippingCost.toFixed(2)}`
    //     ],
    // ];

    const priceRows: [string, string][] = [
        ["Base Material Printing Cost", `\u20B9${baseMaterialCost.toFixed(2)}`],
        ["Infill, Quantity & Shipping", `\u20B9${infill_quantity_shipping.toFixed(2)}`],
    ];


    priceRows.forEach(([label, value], i) => {
        tableRow(doc, label, value, yPos, i % 2 === 0);
        yPos += 8;
    });


    yPos += 2;


    // Total Amount Highlight Box

    doc.setFillColor(...C.black);
    roundedRect(doc, 20, yPos, 170, 14, 3, "F");

    doc.setFillColor(...C.gold);
    roundedRect(doc, 20, yPos, 4, 14, 2, "F");


    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...C.goldLight);

    doc.text(
        "TOTAL AMOUNT (incl. all charges):",
        28,
        yPos + 9
    );


    doc.setFontSize(13);
    doc.setTextColor(...C.gold);

    textWithRupee(doc, `\u20B9${finalTotal.toFixed(2)}`, 180, yPos + 9, "helvetica", "bold", "right");
    // doc.text(`₹${finalTotal.toFixed(2)}`, 180, yPos + 9, { align: "right" });

    yPos += 22;

    // ─── TERMS & CONDITIONS ──────────────────────────────────────────────────
    sectionHeading(doc, "TERMS & INSTRUCTIONS", 20, yPos);
    yPos += 8;

    const terms = [
        "1. This quotation is algorithmically estimated from your 3D design file volumes.",
        "2. Printability checks and fine-grain details will be manually validated by our team.",
        "3. Our engineer will connect via WhatsApp/Phone to confirm colors and delivery dates.",
        "4. Final pricing may vary slightly subject to print complexity and material availability.",
        "5. Quotation validity: 7 days from the date of issue.",
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...C.midGrey);
    terms.forEach((term) => {
        doc.text(term, 24, yPos);
        yPos += 6;
    });

    yPos += 4;

    // ─── FOOTER BAND ─────────────────────────────────────────────────────────
    const footerY = pageH - 28;

    doc.setFillColor(...C.black);
    doc.rect(0, footerY, pageW, 28, "F");

    doc.setFillColor(...C.gold);
    doc.rect(0, footerY, pageW, 1.2, "F");

    // Signature area
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...C.gold);
    doc.text("Authorised Signatory", 142, footerY + 10);
    doc.setDrawColor(...C.gold);
    doc.setLineWidth(0.3);
    doc.line(132, footerY + 16, 194, footerY + 16);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.lightGrey);
    doc.text("Threeditron Sales Team", 142, footerY + 21);

    // Footer left – contact
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.lightGrey);
    doc.text("threeditron.com  |  +91 7209827299", 20, footerY + 10);
    doc.text("Jamshedpur, Jharkhand, India", 20, footerY + 16);
    doc.setTextColor(...C.gold);
    doc.text("Computer Generated Quotation – No physical signature required.", 20, footerY + 22);

    // ─── Open PDF ────────────────────────────────────────────────────────────
    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
};






















// import { jsPDF } from "jspdf";

// type GenerateQuotationPDFProps = {
//     form: any;
//     weight: any;
//     material: any;
//     color: any;
//     quantity: any;
//     shipping: any;
//     infill: any;
//     estimatedPrice: any;
//     fileName: any;
//     stlFile: any;

//     showDelivery: boolean;

//     getMaterialLabel: (m: any) => string;
//     getShippingLabel: (s: any) => string;
// };

// // ─── Color Palette ────────────────────────────────────────────────────────────
// const C = {
//     black: [10, 10, 10] as [number, number, number],
//     darkGrey: [30, 30, 30] as [number, number, number],
//     midGrey: [70, 70, 70] as [number, number, number],
//     lightGrey: [180, 180, 180] as [number, number, number],
//     offWhite: [248, 246, 240] as [number, number, number],
//     white: [255, 255, 255] as [number, number, number],
//     gold: [212, 175, 55] as [number, number, number],   // Classic gold
//     goldLight: [234, 205, 100] as [number, number, number],
//     goldDark: [160, 120, 20] as [number, number, number],
//     accentBlue: [30, 58, 138] as [number, number, number],   // Deep navy accent
//     rowAlt: [250, 248, 240] as [number, number, number],   // Warm tinted row
// };

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// /** Load any image URL (or public path) as base64 for jsPDF */
// async function fetchImageAsBase64(src: string): Promise<string> {
//     const res = await fetch(src);
//     const blob = await res.blob();
//     return await new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result as string);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//     });
// }

// /** Draw a rounded rectangle (jsPDF native rect doesn't support radius well) */
// function roundedRect(
//     doc: jsPDF,
//     x: number, y: number, w: number, h: number,
//     r: number,
//     style: "F" | "S" | "FD" = "F"
// ) {
//     doc.roundedRect(x, y, w, h, r, r, style);
// }

// /** Draw a thin horizontal rule */
// function rule(doc: jsPDF, x1: number, y: number, x2: number, color = C.gold) {
//     doc.setDrawColor(...color);
//     doc.setLineWidth(0.4);
//     doc.line(x1, y, x2, y);
// }

// /** Draw a section heading with left gold bar + underline */
// function sectionHeading(doc: jsPDF, label: string, x: number, y: number) {
//     // Gold left bar
//     doc.setFillColor(...C.gold);
//     doc.rect(x, y - 4, 3, 6, "F");
//     // Label
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(10);
//     doc.setTextColor(...C.darkGrey);
//     doc.text(label, x + 6, y);
//     // Underline
//     rule(doc, x + 6, y + 1.5, 190, C.lightGrey);
// }

// /** Table row helper */
// function tableRow(
//     doc: jsPDF,
//     label: string,
//     value: string,
//     y: number,
//     isAlt: boolean
// ) {
//     const rowH = 8;
//     if (isAlt) {
//         doc.setFillColor(...C.rowAlt);
//         doc.rect(20, y - 5.5, 170, rowH, "F");
//     }
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(9);
//     doc.setTextColor(...C.midGrey);
//     doc.text(label, 24, y);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(...C.darkGrey);
//     doc.text(value, 110, y);
// }

// // ─── Main export ──────────────────────────────────────────────────────────────

// export const generateQuotationPDF = async ({
//     form,
//     weight,
//     material,
//     color,
//     quantity,
//     shipping,
//     infill,
//     estimatedPrice,
//     fileName,
//     stlFile,
//     showDelivery,
//     getMaterialLabel,
//     getShippingLabel,
// }: GenerateQuotationPDFProps) => {

//     const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//     });

//     const pageW = 210;
//     const pageH = 297;

//     // ─── Quote Meta ──────────────────────────────────────────────────────────
//     const quoteNo = `TD-${Date.now().toString().slice(-6)}`;
//     const today = new Date();
//     const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
//         today.getMonth() + 1
//     ).padStart(2, "0")}/${today.getFullYear()}`;

//     // ─── Fetch logo ONCE – reused for both watermark and header ────────────
//     // Using logo.jpg (~370 KB) instead of main-logo.png (~2.8 MB) for speed.
//     let logoB64: string | null = null;
//     try {
//         logoB64 = await fetchImageAsBase64("/images/logo.jpg");
//     } catch (_) {
//         // Logo unavailable – continue without it
//     }

//     // ─── WATERMARK (behind everything) ──────────────────────────────────────
//     if (logoB64) {
//         doc.saveGraphicsState();
//         doc.setGState(new (doc as any).GState({ opacity: 0.08 }));
//         doc.addImage(logoB64, "JPEG", 42, 90, 126, 110);
//         doc.restoreGraphicsState();
//     }

//     // ─── HEADER BACKGROUND ───────────────────────────────────────────────────
//     // Dark base
//     doc.setFillColor(...C.black);
//     doc.rect(0, 0, pageW, 50, "F");

//     // Gold bottom stripe on header
//     doc.setFillColor(...C.gold);
//     doc.rect(0, 46, pageW, 1.8, "F");

//     // ─── LOGO in header ──────────────────────────────────────────────────────
//     if (logoB64) {
//         doc.setFillColor(...C.white);
//         roundedRect(doc, 12, 4, 40, 40, 3, "F");
//         doc.addImage(logoB64, "JPEG", 13, 5, 38, 38);
//     }

//     // Company name
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(22);
//     doc.setTextColor(...C.gold);
//     doc.text("THREEDITRON", 58, 18);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8.5);
//     doc.setTextColor(...C.lightGrey);
//     doc.text("Online 3D Printing & Rapid Prototyping Services", 58, 25);
//     doc.text("Jamshedpur, Jharkhand, India", 58, 31);
//     doc.text("Phone: +91 7209827299  |  threeditron.com", 58, 37);

//     // Quotation badge (right side of header)
//     doc.setFillColor(...C.gold);
//     roundedRect(doc, 135, 8, 62, 30, 3, "F");
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(8);
//     doc.setTextColor(...C.black);
//     doc.text("QUOTATION", 145, 16);
//     doc.setFontSize(11);
//     doc.text(quoteNo, 145, 23);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8);
//     doc.text(`Date: ${formattedDate}`, 145, 30);

//     // ─── DOCUMENT TITLE ──────────────────────────────────────────────────────
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(13);
//     doc.setTextColor(...C.darkGrey);
//     doc.text("3D PRINTING QUOTATION", pageW / 2, 60, { align: "center" });

//     rule(doc, 20, 63, 190, C.gold);
//     rule(doc, 20, 64.2, 190, C.goldLight);

//     // ─── CUSTOMER DETAILS ────────────────────────────────────────────────────
//     let yPos = 74;
//     sectionHeading(doc, "CUSTOMER DETAILS", 20, yPos);
//     yPos += 8;

//     const customerRows: [string, string][] = [
//         ["Name", form.name || "N/A"],
//         ["Phone", form.phone || "N/A"],
//         ["Email", form.email || "N/A"],
//     ];

//     if (showDelivery) {
//         const addr = [form.address, form.city, form.state, form.pincode]
//             .filter(Boolean)
//             .join(", ");
//         customerRows.push(["Delivery Address", addr || "N/A"]);
//     }

//     customerRows.forEach(([label, value], i) => {
//         tableRow(doc, label, value, yPos, i % 2 === 0);
//         yPos += 8;
//     });

//     yPos += 4;

//     // ─── 3D MODEL SPECIFICATIONS ─────────────────────────────────────────────
//     sectionHeading(doc, "3D MODEL SPECIFICATIONS", 20, yPos);
//     yPos += 8;

//     const specRows: [string, string][] = [
//         ["File Name", fileName || stlFile?.name || "N/A"],
//         ["Estimated Weight", `${weight || 0} grams`],
//         ["Material", getMaterialLabel(material)],
//         ["Infill Density", `${Number(infill) * 10}%`],
//         ["Color", color || "N/A"],
//         ["Quantity", `${quantity || 1} unit(s)`],
//         ["Shipping Mode", getShippingLabel(shipping)],
//     ];

//     specRows.forEach(([label, value], i) => {
//         tableRow(doc, label, value, yPos, i % 2 === 0);
//         yPos += 8;
//     });

//     yPos += 4;

//     // // ─── PRICE BREAKDOWN ─────────────────────────────────────────────────────
//     // sectionHeading(doc, "PRICE BREAKDOWN", 20, yPos);
//     // yPos += 8;

//     // // Material rates per gram
//     // const materialRates: Record<string, number> = {
//     //     PLA: 10, ABS: 15, TPU: 25, PETG: 40,
//     // };
//     // const materialLabel = getMaterialLabel(material);
//     // const materialName = materialLabel.split(" ")[0];
//     // const modelWeight = Number(weight) || 0;
//     // const materialCost = modelWeight * (materialRates[materialName] || 0);
//     // const finalTotal = Number(estimatedPrice) || 0;

//     // const priceRows: [string, string][] = [
//     //     ["Base Material Printing Cost", `₹${materialCost.toFixed(2)}`],
//     //     ["Infill, Quantity & Shipping", "Included in total"],
//     // ];

//     // priceRows.forEach(([label, value], i) => {
//     //     tableRow(doc, label, value, yPos, i % 2 === 0);
//     //     yPos += 8;
//     // });

//     // yPos += 2;

//     // // Total Amount highlighted box
//     // doc.setFillColor(...C.black);
//     // roundedRect(doc, 20, yPos, 170, 14, 3, "F");
//     // doc.setFillColor(...C.gold);
//     // roundedRect(doc, 20, yPos, 4, 14, 2, "F");

//     // doc.setFont("helvetica", "bold");
//     // doc.setFontSize(11);
//     // doc.setTextColor(...C.goldLight);
//     // doc.text("TOTAL AMOUNT (incl. all charges):", 28, yPos + 9);

//     // doc.setFontSize(13);
//     // doc.setTextColor(...C.gold);
//     // doc.text(`₹${finalTotal.toFixed(2)}`, 180, yPos + 9, { align: "right" });

//     // yPos += 22;

//     // ─── PRICE BREAKDOWN ─────────────────────────────────────────────────────

//     sectionHeading(doc, "PRICE BREAKDOWN", 20, yPos);
//     yPos += 8;


//     // Material rates per gram
//     const materialRates: Record<string, number> = {
//         PLA: 10,
//         ABS: 15,
//         TPU: 25,
//         PETG: 40,
//     };


//     const materialLabel = getMaterialLabel(material);
//     const materialName = materialLabel.split(" ")[0];

//     const modelWeight = Number(weight) || 0;
//     const modelQuantity = Number(quantity) || 1;


//     // Material cost
//     const baseMaterialCost =
//         modelWeight *
//         (materialRates[materialName] || 0);


//     // Infill calculation
//     const infillMultiplier: Record<number, number> = {
//         1: 0,
//         2: 0.1,
//         3: 0.3,
//         4: 0.4,
//         5: 0.5,
//         6: 0.6,
//         7: 0.7,
//         8: 0.8,
//         9: 0.9,
//         10: 1,
//     };


//     const infillAdjustment =
//         baseMaterialCost *
//         (infillMultiplier[Number(infill)] || 0);


//     // Quantity cost
//     const quantityCost =
//         (baseMaterialCost + infillAdjustment) *
//         (modelQuantity - 1);


//     // Shipping calculation
//     const shippingMultiplier: Record<number, number> = {
//         1: 0,
//         2: 0.5,
//         3: 1,
//     };

//     const infill_quantity_shipping = infillAdjustment + quantityCost + shippingMultiplier[Number(shipping)];


//     const subtotal =
//         (baseMaterialCost + infillAdjustment) *
//         modelQuantity;


//     const shippingCost =
//         subtotal *
//         (shippingMultiplier[Number(shipping)] || 0);


//     // Final total
//     const finalTotal = Number(estimatedPrice) || 0;



//     // const priceRows: [string, string][] = [
//     //     [
//     //         "Base Material Printing Cost",
//     //         `₹${baseMaterialCost.toFixed(2)}`
//     //     ],

//     //     [
//     //         "Infill Adjustment",
//     //         `₹${infillAdjustment.toFixed(2)}`
//     //     ],

//     //     [
//     //         "Quantity Adjustment",
//     //         `₹${quantityCost.toFixed(2)}`
//     //     ],

//     //     [
//     //         "Shipping Charges",
//     //         `₹${shippingCost.toFixed(2)}`
//     //     ],
//     // ];

//     const priceRows: [string, string][] = [
//         ["Base Material Printing Cost", `\u20B9${baseMaterialCost.toFixed(2)}`],
//         ["Infill, Quantity & Shipping", `\u20B9${infill_quantity_shipping.toFixed(2)}`],
//     ];


//     priceRows.forEach(([label, value], i) => {
//         tableRow(doc, label, value, yPos, i % 2 === 0);
//         yPos += 8;
//     });


//     yPos += 2;


//     // Total Amount Highlight Box

//     doc.setFillColor(...C.black);
//     roundedRect(doc, 20, yPos, 170, 14, 3, "F");

//     doc.setFillColor(...C.gold);
//     roundedRect(doc, 20, yPos, 4, 14, 2, "F");


//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(11);
//     doc.setTextColor(...C.goldLight);

//     doc.text(
//         "TOTAL AMOUNT (incl. all charges):",
//         28,
//         yPos + 9
//     );


//     doc.setFontSize(13);
//     doc.setTextColor(...C.gold);

//     doc.text(`\u20B9${finalTotal.toFixed(2)}`, 180, yPos + 9, { align: "right" });
//     // doc.text(`₹${finalTotal.toFixed(2)}`, 180, yPos + 9, { align: "right" });

//     yPos += 22;

//     // ─── TERMS & CONDITIONS ──────────────────────────────────────────────────
//     sectionHeading(doc, "TERMS & INSTRUCTIONS", 20, yPos);
//     yPos += 8;

//     const terms = [
//         "1. This quotation is algorithmically estimated from your 3D design file volumes.",
//         "2. Printability checks and fine-grain details will be manually validated by our team.",
//         "3. Our engineer will connect via WhatsApp/Phone to confirm colors and delivery dates.",
//         "4. Final pricing may vary slightly subject to print complexity and material availability.",
//         "5. Quotation validity: 7 days from the date of issue.",
//     ];

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8.5);
//     doc.setTextColor(...C.midGrey);
//     terms.forEach((term) => {
//         doc.text(term, 24, yPos);
//         yPos += 6;
//     });

//     yPos += 4;

//     // ─── FOOTER BAND ─────────────────────────────────────────────────────────
//     const footerY = pageH - 28;

//     doc.setFillColor(...C.black);
//     doc.rect(0, footerY, pageW, 28, "F");

//     doc.setFillColor(...C.gold);
//     doc.rect(0, footerY, pageW, 1.2, "F");

//     // Signature area
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(9);
//     doc.setTextColor(...C.gold);
//     doc.text("Authorised Signatory", 142, footerY + 10);
//     doc.setDrawColor(...C.gold);
//     doc.setLineWidth(0.3);
//     doc.line(132, footerY + 16, 194, footerY + 16);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8);
//     doc.setTextColor(...C.lightGrey);
//     doc.text("Threeditron Sales Team", 142, footerY + 21);

//     // Footer left – contact
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(7.5);
//     doc.setTextColor(...C.lightGrey);
//     doc.text("threeditron.com  |  +91 7209827299", 20, footerY + 10);
//     doc.text("Jamshedpur, Jharkhand, India", 20, footerY + 16);
//     doc.setTextColor(...C.gold);
//     doc.text("Computer Generated Quotation – No physical signature required.", 20, footerY + 22);

//     // ─── Open PDF ────────────────────────────────────────────────────────────
//     doc.autoPrint();
//     window.open(doc.output("bloburl"), "_blank");
// };