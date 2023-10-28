/* eslint-disable */
function printOwing1(invoice: any) {
  printBanner();
  let outstanding = calculateOutstanding(invoice);

  // 明細の印字
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}

// ↓

function printOwing2(invoice: any) {
  printBanner();
  let outstanding = calculateOutstanding(invoice);
  PrintDetails(outstanding);

  function PrintDetails(outstanding: any) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
  }
}

/*








*/

function printBanner() {
  throw new Error("Function not implemented.");
}

function calculateOutstanding(invoice: any) {
  throw new Error("Function not implemented.");
}
