const app = angular.module("RDApp", []);

app.controller("RDController", function ($scope) {
  $scope.months = monthsInfo;
  $scope.years = yearsInfo;
  $scope.inputQ3 = 100000.0;
  $scope.inputQ4 = 0;
  $scope.isProfitMaking = "true";

  $scope.startDays = getDaysRange(30);
  $scope.startDay = "1";
  $scope.startMonth = "3";
  $scope.startYear = "2022";
  $scope.getStartDate = () =>
    getDate($scope.startYear, $scope.startMonth, $scope.startDay);

  $scope.endDays = getDaysRange(31);
  $scope.endDay = "31";
  $scope.endMonth = "2";
  $scope.endYear = "2023";
  $scope.getEndDate = () =>
    getDate($scope.endYear, $scope.endMonth, $scope.endDay);

  $scope.isSmallCompany = "true";
  $scope.isTotalSpendOfMoreThan40 = "false";
  $scope.net = 70000;
  $scope.fee = 0;

  $scope.startMonthChange = () => {
    const months = monthsInfo.find(
      (e) => e.value === Number($scope.startMonth)
    );
    $scope.startDays = getDaysRange(months.daysinmonth);
  };

  $scope.endMonthChange = () => {
    const months = monthsInfo.find((e) => e.value === Number($scope.endMonth));
    $scope.endDays = getDaysRange(months.daysinmonth);
  };

  $scope.result = () => {
    const calculator = new Calculator();
    const totalSaving = calculator.calculateRDTaxSaving(
      $scope.getStartDate(),
      $scope.getEndDate(),
      $scope.inputQ3,
      $scope.inputQ4,
      $scope.isSmallCompany === "true",
      $scope.isProfitMaking === "true",
      $scope.isTotalSpendOfMoreThan40 === "true"
    );
    $scope.fee = calculator.getFees(totalSaving);
    $scope.net = totalSaving - $scope.fee;
    return totalSaving;
  };
});
