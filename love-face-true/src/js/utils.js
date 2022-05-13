async function getSheetAPI(vm) {
  try {
    const gapi = await vm.$gapi.getGapiClient();
    const response = await gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: process.env.VUE_APP_SPREADSHEET_ID,
        range: process.env.VUE_APP_SPREADSHEET_RANGE,
      });
    const range = response.result;
    const dataArray = range.values;
    const sheetArray = [];
    if (dataArray.length > 0) {
      const keyArray = dataArray[0];
      for (const key in dataArray) {
        if (key > 0) {
          const el = dataArray[key];
          sheetArray.push({
            [keyArray[0]]: el[0],
            [keyArray[1]]: el[1],
            [keyArray[2]]: el[2],
            [keyArray[3]]: el[3],
            [keyArray[4]]: el[4],
            RowNumber: Number(key) + 1,
          });
        }
      }
      vm.$store.commit('updateSheetData', sheetArray);
      return true;
    } else {
      console.log("No data found.");
      return false;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return false;
  }
}

export { getSheetAPI };