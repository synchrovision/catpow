import { CP } from "./CP.jsx";

CP.DummyImage = ({ className = "cp-dummyimage", text }) => {
	return <img className={className} src={wpinfo.plugins_url + "/catpow/callee/dummy_image.php?text=" + text} />;
};
