<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <!-- Web Font / @font-face : BEGIN -->
    <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. -->

    <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
    <!--[if mso]>
        <style>
            * {
                font-family: sans-serif !important;
            }
        </style>
    <![endif]-->

    <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
    <!--[if !mso]><!-->
    <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
    <!--<![endif]-->

    <!-- Web Font / @font-face : END -->

    <!-- CSS Reset : BEGIN -->
    <style>

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }
        table table table {
            table-layout: auto;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode:bicubic;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        *[x-apple-data-detectors],  /* iOS */
        .x-gmail-data-detectors,    /* Gmail */
        .x-gmail-data-detectors *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }
        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img + div {
            display: none !important;
        }

        /* What it does: Prevents underlining the button text in Windows 10 */
        .button-link {
            text-decoration: none !important;
        }

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            .email-container {
                min-width: 320px !important;
            }
        }
        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            .email-container {
                min-width: 375px !important;
            }
        }
        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            .email-container {
                min-width: 414px !important;
            }
        }

    </style>
    <!-- CSS Reset : END -->

    <!-- Progressive Enhancements : BEGIN -->
    <style>

    /* What it does: Hover styles for buttons */
    .button-td,
    .button-a {
        transition: all 100ms ease-in;
    }
    .button-td:hover,
    .button-a:hover {
        background: #555555 !important;
        border-color: #555555 !important;
    }

    /* Media Queries */
    @media screen and (max-width: 600px) {

        /* What it does: Adjust typography on small screens to improve readability */
        .email-container p {
            font-size: 17px !important;
        }

    }

    </style>
    <!-- Progressive Enhancements : END -->

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

</head>
<!--
	The email background color (#222222) is defined in three places:
	1. body tag: for most email clients
	2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
	3. mso conditional: For Windows 10 Mail
-->
<body width="100%" bgcolor="#222222" style="margin: 0; mso-line-height-rule: exactly;">
    <center style="width: 100%; background: #222222; text-align: left;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#222222">
    <tr>
    <td>
    <![endif]-->

        <!-- Visually Hidden Preheader Text : BEGIN -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            (Optional) This text will appear in the inbox preview, but not the email body. It can be used to supplement the email subject line or even summarize the email's contents. Extended text preheaders (~490 characters) seems like a better UX for anyone using a screenreader or voice-command apps like Siri to dictate the contents of an email. If this text is not included, email clients will automatically populate it using the text (including image alt text) at the start of the email's body.
        </div>
        <!-- Visually Hidden Preheader Text : END -->

        <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
        <!-- Preview Text Spacing Hack : BEGIN -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
	        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <!-- Preview Text Spacing Hack : END -->

        <!--
            Set the email width. Defined in two places:
            1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.
            2. MSO tags for Desktop Windows Outlook enforce a 600px width.
        -->
        <div style="max-width: 600px; margin: auto;" class="email-container">
            <!--[if mso]>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
            <tr>
            <td>
            <![endif]-->

            <!-- Email Header : BEGIN -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;">
                <tr>
                    <td style="padding: 20px 0; text-align: center">
                        <img src="https://image.noelshack.com/fichiers/2018/16/3/1524054742-icone.jpg" width="200" height="50" alt="alt_text" border="0" style="height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;">
                    </td>
                </tr>
            </table>
            <!-- Email Header : END -->

            <!-- Email Body : BEGIN -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;">

                <!-- Hero Image, Flush : BEGIN -->
                <tr>
                    <td bgcolor="#ffffff" align="center">
                        <img src="data:image/jpeg;base64,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" width="600" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 600px; height: auto; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; margin: auto;" class="g-img">
                    </td>
                </tr>
                <!-- Hero Image, Flush : END -->

                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td bgcolor="#ffffff">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;">
                                    <h1 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 24px; line-height: 125%; color: #333333; font-weight: normal;">Bienvenue ' . $(login) . ' encore quelque pas pour nous rejoindre ... </h1>
                                    <p style="margin: 0;">Pour finaliser ton inscription il te suffit de vérifier ton email en cliquant sur le bouton en dessous ;) nous sommes impatients d t'accueillir parmi nous</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 40px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;">
                                    <!-- Button : BEGIN -->
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto;">
                                        <tr>
                                            <td style="border-radius: 3px; background: #222222; text-align: center;" class="button-td">
                                                <a href="http://www.google.com" style="background: #222222; border: 15px solid #222222; font-family: sans-serif; font-size: 13px; line-height: 110%; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a">
                                                    <span style="color:#ffffff;" class="button-link">&nbsp;&nbsp;&nbsp;&nbsp;Vérifier email&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- Button : END -->
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;">
                                    <h2 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px; line-height: 125%; color: #333333; font-weight: bold;">Camagru le site de montage photo communautaire par exellence !</h2>
                                    <p style="margin: 0;">Camagru est un service de montage photo communautaire, vous permettant facilement de créer et partager vos montages ainsi que de réagir à ceux des autres !</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->

                <!-- 2 Even Columns : BEGIN -->
                <tr>
                    <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style="padding: 0 10px 40px 10px">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:560px;">
                            <tr>
                                <td align="left" valign="top" width="50%">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px; text-align: left;">
                                        <tr>
                                            <td style="text-align: center; padding: 0 10px;">
                                                <img src="https://images-eu.ssl-images-amazon.com/images/I/91hLtphTIvL._AC_US200_.png" width="200" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 200px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: left; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding: 10px 10px 0;">
                                               <p style="margin: 0;">"On a découvert une nouvelle espèce animal dans la ZAAD ahahaha"</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td align="left" valign="top" width="50%">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px; text-align: left;">
                                        <tr>
                                            <td style="text-align: center; padding: 0 10px;">
                                                <img src="https://ai-i1.infcdn.net/icons_siandroid/png/200/13750/13750854.png" width="200" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 200px; background: #dddddd; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: left; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding: 10px 10px 0;">
                                                <p style="margin: 0;">"Je crois avoir trouvée mon animal fétiche loooool, vs ne pensz quoi ?"</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- Two Even Columns : END -->

                <!-- Clear Spacer : BEGIN -->
                <tr>
                    <td aria-hidden="true" height="40" style="font-size: 0; line-height: 0;">
                        &nbsp;
                    </td>
                </tr>
                <!-- Clear Spacer : END -->
dfsdfdsfsdfdsfsdfd

            </table>
            <!-- Email Body : END -->

            <!-- Email Footer : BEGIN -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;">
                <tr>
                    <td style="padding: 40px 10px; font-family: sans-serif; font-size: 12px; line-height: 140%; text-align: center; color: #888888;" class="x-gmail-data-detectors">
                        <webversion style="color: #cccccc; text-decoration: underline; font-weight: bold;">View as a Web Page</webversion>
                        <br><br>
                        Company Name<br>123 Fake Street, SpringField, OR, 97477 US<br>(123) 456-7890
                        <br><br>
                        <unsubscribe style="color: #888888; text-decoration: underline;">unsubscribe</unsubscribe>
                    </td>
                </tr>
            </table>
            <!-- Email Footer : END -->

            <!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </div>

        <!-- Full Bleed Background Section : BEGIN -->
        <table role="presentation" bgcolor="#709f2b" cellspacing="0" cellpadding="0" border="0" align="center" width="100%">
            <tr>
                <td valign="top" align="center">
                    <div style="max-width: 600px; margin: auto;" class="email-container">
                        <!--[if mso]>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
                        <tr>
                        <td>
                        <![endif]-->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 40px; text-align: left; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #ffffff;">
                                    <p style="margin: 0;">Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquendsffsdfsdfdsfsdfdsfsdfdst per conubia nostra, per inceptos himenaeos. Praesent laoreet malesuada cursus. Maecenas scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut&nbsp;erat.</p>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </div>
                </td>
            </tr>
        </table>
        <!-- Full Bleed Background Section : END -->

    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
    </center>
</body>
</html>