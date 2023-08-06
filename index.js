var pricingRules = {
    op10: function (count) { return count * 849.99; },
    op11: function (count) { return (count > 4 ? count * 899.99 : count * 949.99); },
    buds: function (count) { return Math.floor(count / 3) * 2 * 129.99 + (count % 3) * 129.99; },
    wtch: function (count) { return count * 229.99; },
};
var Checkout = /** @class */ (function () {
    function Checkout(pricingRules) {
        this.pricingRules = pricingRules;
        this.items = {};
    }
    Checkout.prototype.scan = function (item) {
        if (this.items[item]) {
            this.items[item]++;
        }
        else {
            this.items[item] = 1;
        }
    };
    Checkout.prototype.total = function () {
        var total = 0;
        for (var item in this.items) {
            total += this.pricingRules[item](this.items[item]);
        }
        return total;
    };
    return Checkout;
}());
var co = new Checkout(pricingRules);
co.scan("buds");
co.scan("op10");
co.scan("buds");
co.scan("buds");
console.log(co.total()); // $1109.97
var co2 = new Checkout(pricingRules);
co2.scan("wtch");
co2.scan("op11");
co2.scan("op11");
co2.scan("op11");
co2.scan("buds");
co2.scan("buds");
co2.scan("op11");
co2.scan("op11");
console.log(co2.total()); // $4989.92
