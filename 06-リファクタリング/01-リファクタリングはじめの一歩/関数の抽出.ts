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
