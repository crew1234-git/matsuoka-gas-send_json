const TOKEN = "cJrAD9Es62qm0Z3eE6uzQQe2dpc1t8QnWZrHOMgMb";
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwnpo2mo94MqRuGFCd1pO92e34v_tGMwqRgKQ6VvxxAohFHo_A5QCs44Gc6XCcjOwOxYg/exec";

const postSpreadsheetData = () => {
  const ui = SpreadsheetApp.getUi(); // UIインスタンスの取得
  const response = ui.alert('確認', 'keywordを送信しますか？', ui.ButtonSet.YES_NO);

  if (response == ui.Button.YES) {
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const lastRow = sheet.getLastRow();
      // A列とD列のデータを取得
      const dataRange = sheet.getRange(2, 1, lastRow - 1, 4); // 2行目から最終行まで、1から4列目（AからD）まで
      const data = dataRange.getValues().map(row => [row[0], row[3]]).filter(row => row[0] !== ""); // A列が空でない行のA列とD列のデータ
      
      const payload = {
        data: data,
        filenamePrefix: sheet.getRange("C2").getValue(),
        token: TOKEN
      };
      
      const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload)
      };
      
      const response = UrlFetchApp.fetch(WEB_APP_URL, options);
      Logger.log(response.getContentText());
      ui.alert('Keywordデータの送信に成功しました');
    } catch (e) {
      ui.alert(`Keywordデータの送信でエラーが発生しました: ${e.message}`);
    }
  } else {
    ui.alert('送信がキャンセルされました。');
  }
};
