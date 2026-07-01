(() => {
  // ../blocks/sidebar-articlenav/editor_init.jsx
  wp.hooks.addFilter("catpow.blocks.sidebar.allowedBlocks", "catpow/editor", (allowedBlocks) => [...allowedBlocks, "catpow/sidebar-articlenav"]);
})();
