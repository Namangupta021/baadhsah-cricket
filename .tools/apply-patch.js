const fs = require("fs");
const path = require("path");
const vm = require("vm");

const patches = {
  "[id]-3500fba12610a805fc09f105be3ea620.js": [769],
  "[id]-df34bf0092584362db772d283973f871.js": [768],
  "data-backups-2e1f7f2a56edda50681a80fa8ea875bc.js": [760],
  "__common-544e76b37d4da68f62c23250dda1d8c8.js": [773, 865],
  "_layout-c2fef04989f7440d404f8d0c7d3ea14c.js": [759],
  "rankings-233247f00879b6981bae17b5ca680271.js": [767],
  "match-setup-4f50c3f7794ce060b27a5e13fffa824a.js": [765],
  "history-c70a6b4cc6a2299a3dfafca57445130b.js": [763],
};

for (const [name, ids] of Object.entries(patches)) {
  const original = fs.readFileSync(path.join(__dirname, "patch", `original-${name}`), "utf8");
  const target = path.join(__dirname, "..", "mirror", "_expo", "static", "js", "web", name);
  let out = original;
  for (const id of ids) {
    let oldSrc;
    vm.runInNewContext(original, { __d: (fn, mid) => mid === id && (oldSrc = fn.toString()) });
    if (!oldSrc || !original.includes(oldSrc)) throw new Error(`module ${id} not found in ${name}`);
    const patched = fs.readFileSync(path.join(__dirname, "patch", `${id}.js`), "utf8")
      .replace(/^\/\/.*\n/, "").trim().replace(/^\(/, "").replace(/\);?$/, "");
    new vm.Script(`(${patched})`);
    out = out.replace(oldSrc, () => patched);
  }
  new vm.Script(out);
  fs.writeFileSync(target, out);
  console.log("patched", name, original.length, "->", out.length);
}
