function isInvalidBox(vb: string) {
  // valid is "minX minY width height" numbers only
  return !/^\s*-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\s+\d+(\.\d+)?\s+\d+(\.\d+)?\s*$/.test(vb);
}

function fixOne(svg: SVGSVGElement) {
  const vb = svg.getAttribute("viewBox");
  if (vb && isInvalidBox(vb)) {
    // try width/height attributes if present
    const wAttr = svg.getAttribute("width") || "100";
    const hAttr = svg.getAttribute("height") || "100";
    const toNum = (v: string) => {
      const n = parseFloat(String(v).replace(/[^\d.\-]/g, ""));
      return isFinite(n) && n > 0 ? n : 100;
    };
    const W = toNum(wAttr);
    const H = toNum(hAttr);
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    // console.debug("[SVG fixed] viewBox ->", svg);
  }
}

export function sanitizeAllSVGs(root: ParentNode = document) {
  root.querySelectorAll?.("svg[viewBox]").forEach(el => {
    try { fixOne(el as SVGSVGElement); } catch {}
  });
}

export function observeNewSVGs() {
  const mo = new MutationObserver(muts => {
    for (const m of muts) {
      m.addedNodes.forEach(n => {
        if (n instanceof SVGSVGElement) fixOne(n);
        else if (n instanceof Element) sanitizeAllSVGs(n);
      });
    }
  });
  mo.observe(document.documentElement, { childList:true, subtree:true });
}

document.addEventListener("DOMContentLoaded", () => {
  sanitizeAllSVGs(document);
  observeNewSVGs();
});
