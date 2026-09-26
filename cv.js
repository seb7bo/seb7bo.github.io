// Post-processing after casual-markdown renders the resume.
// casual-markdown leaves the text after a heading as bare text nodes;
// wrap it in <p> so it can be styled (e.g. the experience timeline).
function cvEnhance() {
    var block = /^(P|UL|OL|H[1-6]|DIV|PRE|TABLE|HR|BLOCKQUOTE)$/;
    document.querySelectorAll('h3').forEach(function (h) {
        var nodes = [];
        for (var n = h.nextSibling; n && !(n.nodeType === 1 && block.test(n.tagName)); n = n.nextSibling) {
            nodes.push(n);
        }
        if (!nodes.some(function (n) { return n.textContent.trim(); })) return;
        var p = document.createElement('p');
        h.after(p);
        nodes.forEach(function (n) { p.appendChild(n); });
    });
}
