class Calculator {
  getTotalForScheme1(eligibleCost, smallCompany, inProfit) {
    let p = 10.5;
    if (smallCompany) {
      p = inProfit ? 24.7 : 33.35;
    }
    return (eligibleCost / 100) * p;
  }

  getTotalForScheme2(
    eligibleCost,
    smallCompany,
    inProfit,
    totalSpendOfMoreThan40
  ) {
    let p = 16.2;
    if (smallCompany) {
      if (inProfit) {
        p = 21.5;
      } else {
        p = totalSpendOfMoreThan40 ? 26.97 : 18.6;
      }
    }
    return (eligibleCost / 100) * p;
  }

  getTotalForScheme3(
    eligibleCost,
    smallCompany,
    inProfit,
    totalSpendOfMoreThan40
  ) {
    let p = smallCompany ? 16.2 : 15;
    if (!inProfit && smallCompany && totalSpendOfMoreThan40) {
      p = 26.97;
    }
    return (eligibleCost / 100) * p;
  }

  calculateRDTaxSaving(
    startDate,
    endDate,
    inputQ3,
    inputQ4,
    isSmallCompany,
    isInProfit,
    isTotalSpendOfMoreThan40
  ) {
    const schemes = this.getRateLength(startDate, endDate);

    console.log(
      startDate.toLocaleDateString(),
      endDate.toLocaleDateString(),
      inputQ3,
      inputQ4,
      isSmallCompany,
      isInProfit,
      isTotalSpendOfMoreThan40,
      schemes.rate1Length,
      schemes.rate2Length,
      schemes.rate3Length
    );

    const totalNumberOfDays =
      schemes.rate1Length + schemes.rate2Length + schemes.rate3Length;

    const eligibleCost = this.getEligibleCosts(
      isSmallCompany,
      startDate,
      inputQ3,
      inputQ4
    );

    const dailyCost = eligibleCost / totalNumberOfDays;

    let result = 0;

    if (schemes.rate1Length > 0) {
      result = this.getTotalForScheme1(
        dailyCost * schemes.rate1Length,
        isSmallCompany,
        isInProfit
      );
    }
    if (schemes.rate2Length > 0) {
      result += this.getTotalForScheme2(
        dailyCost * schemes.rate2Length,
        isSmallCompany,
        isInProfit,
        isTotalSpendOfMoreThan40
      );
    }
    if (schemes.rate3Length > 0) {
      result += this.getTotalForScheme3(
        dailyCost * schemes.rate3Length,
        isSmallCompany,
        isInProfit,
        isTotalSpendOfMoreThan40
      );
    }
    return Number(result.toFixed(2));
  }

  getFees(totalSaving) {
    const feePercentage = totalSaving > 200000 ? 0.025 : 0.05;
    let fee = totalSaving * feePercentage;
    if (fee < 2500) {
      fee = 2500;
    }
    return fee;
  }

  getEligibleCosts(isSmallCompany, startDate, inputQ3, inputQ4) {
    if (!isSmallCompany && startDate < rate3StartDate) {
      // RDEC(large companies) cannot claim for subcontracted costs.
      // for any accounting period beginning before 01/04/24,
      return inputQ3;
    } else {
      return inputQ3 + inputQ4 * 0.65;
    }
  }

  daysBetweenRange(date1, date2, rangeStart, rangeEnd) {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    const rangeStartTime = rangeStart.getTime();
    const rangeEndTime = rangeEnd.getTime();
    const effectiveStart = Math.max(time1, rangeStartTime);
    const effectiveEnd = Math.min(time2, rangeEndTime);

    if (effectiveStart <= effectiveEnd) {
      const diffInMs = effectiveEnd - effectiveStart;
      return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    } else {
      return 0;
    }
  }

  daysBetween(date1, date2) {
    const time1 = new Date(date1).getTime();
    const time2 = new Date(date2).getTime();
    const diffInMs = Math.abs(time2 - time1);
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  }

  getRateLength(startDate, endDate) {
    const rate1Length = this.daysBetweenRange(
      startDate,
      endDate,
      new Date(2000, 0, 1),
      rate1EndDate
    );
    const rate2Length = this.daysBetweenRange(
      startDate,
      endDate,
      rate2StartDate,
      rate2EndDate
    );
    const rate3Length = this.daysBetweenRange(
      startDate,
      endDate,
      rate3StartDate,
      new Date(3000, 0, 1)
    );

    if (rate2Length > 0 && rate3Length > 0) {
      // clause for scheme2
      const totalDays = this.daysBetween(startDate, endDate);
      return { rate1Length: 0, rate2Length: totalDays, rate3Length: 0 };
    }

    return {
      rate1Length: rate1Length,
      rate2Length: rate2Length,
      rate3Length: rate3Length,
    };
  }
}
