<?php
unset($_SESSION['fb_access_token']);
wp_logout();
wp_redirect(home_url());
exit;