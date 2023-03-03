(() => {
  // ../functions/instagram/blocks/instagramfeed/component.jsx
  Catpow.InstagramFeed = (props) => {
    const { users } = props;
    const { useEffect, useState, useMemo } = wp.element;
    const [medias, setMedias] = useState(false);
    const classes = Catpow.util.bem("wp-block-catpow-instagramfeed");
    useEffect(() => {
      wp.apiFetch({ path: "/cp/v1/instagram/media" }).then((res) => {
        setMedias(res.medias);
      });
    }, []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes.items() }, medias && medias.map((media) => /* @__PURE__ */ wp.element.createElement("div", { className: classes.items.item(), key: media.id }, /* @__PURE__ */ wp.element.createElement("img", { className: classes.items.item.img(), src: media.media_url, alt: "" }))));
  };
})();
