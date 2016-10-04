angular
  .module("swishListApp")
  .controller("ArchiveShowCtrl", ArchiveShowCtrl);


  ArchiveShowCtrl.$inject = ["Transaction", "CurrentUserService"];
  function ArchiveShowCtrl(Transaction, CurrentUserService){
    console.log("hello");
    const vm = this;
    Transaction
    .query({ responder : CurrentUserService.getUser().id})
    .$promise
    .then(data => {
      vm.transactions = data.transactions;
      console.log("HERE");
      console.log(data);
      console.log(vm.transactions);
      for (var i = 0; i < vm.transactions.length; i++) {
        vm.transactions[i].emailAddress = vm.transactions[i].initiator.email;
      }
      console.log("ADDING EMAILS TO FIRST BATCH");
      console.log(vm.transactions);
      Transaction
      .query({ initiator : CurrentUserService.getUser().id })
      .$promise
      .then(data => {
        vm.transactionsTwo = data.transactions;
        console.log("HERE2");
        console.log(vm.transactionsTwo);
        for (var i = 0; i < vm.transactionsTwo.length; i++) {
          vm.transactionsTwo[i].emailAddress = vm.transactionsTwo[i].responder.email;
          vm.transactions.push(vm.transactionsTwo[i]);
        }
        console.log("FINAL BIT");
        console.log(vm.transactions);
      });
    });
  }
