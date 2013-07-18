/**
 * Piwik - Open source web analytics
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html Gpl v3 or later
 */

var processedReport = arguments[0] || {};

function isTitaniumCompatibleImageUrl(url)
{
    return require('ui/helper').isTitaniumCompatibleImageUrl(url);
}

function showLogo(processedReport)
{
    var logoPath = processedReport.getLogo();

    if (!isTitaniumCompatibleImageUrl(logoPath)) {
        return;
    }

    var accountModel = require('session').getAccount();

    if (!accountModel) {
        console.log('cannot display logo, no account', 'report_row');
        return;
    }

    var iconWidth = processedReport.getLogoWidth() || 16;
    var iconLeft  = OS_ANDROID ? '8dp' : 10;
    
    $.icon.width  = iconWidth;
    $.icon.height = processedReport.getLogoHeight() || 16;
    $.icon.left   = iconLeft;
    $.icon.image  = accountModel.getBasePath() + logoPath;
    $.icon.show();

    if (!_.isNumber(iconLeft)) {
        iconLeft = Ti.UI.convertUnits(iconLeft, Ti.UI.UNIT_PX);
    }

    $.stats.left  = iconWidth + iconLeft;
}

if (processedReport) {
    $.title.text = processedReport.getTitle();
    $.value.text = processedReport.getValue();

    if (processedReport.hasLogo()) {
        showLogo(processedReport);
    }
} 