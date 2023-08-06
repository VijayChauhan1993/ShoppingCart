interface PricingRules {
    [key: string]: (count: number) => number;
  }
  
  const pricingRules: PricingRules = {
      op10: (count) => count * 849.99,
      op11: (count) => (count > 4 ? count * 899.99 : count * 949.99),
      buds: (count) => Math.floor(count / 3) * 2 * 129.99 + (count % 3) * 129.99,
      wtch: (count) => count * 229.99,
    };
  
  class Checkout {
    pricingRules: PricingRules;
    items: { [key: string]: number };
  
    constructor(pricingRules: PricingRules) {
      this.pricingRules = pricingRules;
      this.items = {};
    }
  
    scan(item: string) {
      if (this.items[item]) {
        this.items[item]++;
      } else {
        this.items[item] = 1;
      }
    }
  
    total() {
      let total = 0;
      for (const item in this.items) {
        total += this.pricingRules[item](this.items[item]);
      }
      return total;
    }
  }
  
  const co = new Checkout(pricingRules);
  co.scan("buds");
  co.scan("op10");
  co.scan("buds");
  co.scan("buds");
  console.log(co.total()); // $1109.97
  
  const co2 = new Checkout(pricingRules);
  co2.scan("wtch");
  co2.scan("op11");
  co2.scan("op11");
  co2.scan("op11");
  co2.scan("buds");
  co2.scan("buds");
  co2.scan("op11");
  co2.scan("op11");
  console.log(co2.total()); // $4989.92
  