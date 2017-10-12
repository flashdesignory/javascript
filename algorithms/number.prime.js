/*
 * @title: Prime Number
 * @description: prime numbers can only divide by itself and one.
 * @author: Thorsten Kober
 * @email: info@flashdesignory.com
 */

function isPrime_one(number){
	var divisor = 2;

	while(number > divisor){
		if(number % divisor == 0){
			return false;
		}else{
			divisor++;
		}
	}
	return true;
}

console.log(isPrime_one(137));
console.log(isPrime_one(237));

function isPrime_two(number){
	var divisor = 3;
	var limit = Math.sqrt(number);

	if(number == 2 || number == 3){
		return true;
	}

	if(number % 2 == 0){
		return false;
	}

	while(divisor <= limit){
		if(number % divisor == 0){
			return false;
		}else{
			divisor += 2;
		}
	}

	return true;
}

console.log(isPrime_two(137));
console.log(isPrime_two(237));