function lotteryNum() {
	return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(existing_lottery_nums, num_to_add) {
	return existing_lottery_nums.concat(num_to_add).sort((a,b) => a - b);
}

var luckyLotteryNumbers = [];

while (luckyLotteryNumbers.length < 6) {
	luckyLotteryNumbers = pickNumber(
		luckyLotteryNumbers,
		lotteryNum(),
	);
}

console.log(luckyLotteryNumbers);