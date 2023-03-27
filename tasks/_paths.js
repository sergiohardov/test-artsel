const folder_src = "src";
const folder_dist = "dist";

const paths = {
  src: {
    folder: folder_src,
    html: folder_src + "/html",
    html_components: folder_src + "/html/components",
    html_pages: folder_src + "/html/pages",
    scss: folder_src + "/scss",
    scss_components: folder_src + "/scss/components",
    scss_global: folder_src + "/scss/global",
    js: folder_src + "/js",
    fonts: folder_src + "/fonts",
    images: folder_src + "/images",
  },
  dist: {
    folder: folder_dist,
  },
};

module.exports = paths;