const TOKEN = "cJrAD9Es62qm0Z3eE6uzQQe2dpc1t8QnWZrHOMgMb";
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwnpo2mo94MqRuGFCd1pO92e34v_tGMwqRgKQ6VvxxAohFHo_A5QCs44Gc6XCcjOwOxYg/exec";

const postSpreadsheetData = () => {
  const ui = SpreadsheetApp.getUi(); // UIインスタンスの取得
  // 確認ダイアログを表示
  const response = ui.alert('確認', 'keywordを送信しますか？', ui.ButtonSet.YES_NO);

  // ユーザーの選択に応じて処理
  if (response == ui.Button.YES) {
    try {
      // スプレッドシートのデータを取得（A列のみ）
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      // 最初の行（ヘッダー）を除外してデータを取得
      const columnAData = sheet.getRange("A2:A").getValues().filter(row => row[0] !== "");
      const b2Value = sheet.getRange("B2").getValue();
    
      // POSTリクエストのオプションを設定
      const payload = {
        data: columnAData,
        filenamePrefix: b2Value,
        token: TOKEN
      };
    
      const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload)
      };
    
      // WebアプリケーションにデータをPOST
      const response = UrlFetchApp.fetch(WEB_APP_URL, options);
      Logger.log(response.getContentText());

      // 正常終了時のメッセージ
      ui.alert('Keywordデータの送信に成功しました');
    } catch (e) {
      // 異常終了時のメッセージ
      ui.alert(`Keywordデータの送信でエラーが発生しました: ${e.message}`);
    }
  } else {
    ui.alert('送信がキャンセルされました。');
  }
};
