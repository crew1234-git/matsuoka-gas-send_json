const TOKEN = "cJrAD9Es62qm0Z3eE6uzQQe2dpc1t8QnWZrHOMgMb";
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbws8B77ADDrBTl59bUMSoeq1iEIlAbB3-EpG2VAYM2faakq6tiShpDx0-chLkpMxi9UNw/exec";

const postSpreadsheetData = () => {
  const ui = SpreadsheetApp.getUi(); // UIインスタンスの取得
  const response = ui.alert('確認', 'keywordを送信しますか？', ui.ButtonSet.YES_NO);

  if (response == ui.Button.YES) {
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const lastRow = sheet.getLastRow();
      
      // A列とB列のデータを取得
      const columnAData = sheet.getRange("A2:A" + lastRow).getValues();
      const columnBData = sheet.getRange("B2:B" + lastRow).getValues().map(row => row[0] === "" ? [0] : row);
      
      // A列が空でない行だけをフィルタリング
      const data = columnAData
        .map((row, index) => [row[0], columnBData[index][0]])
        .filter(row => row[0] !== ""); // A列が空の行を除外

      const filenamePrefix = sheet.getRange("C2").getValue(); // C列の2行目
      
      const payload = {
        data: data,
        filenamePrefix: filenamePrefix,
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