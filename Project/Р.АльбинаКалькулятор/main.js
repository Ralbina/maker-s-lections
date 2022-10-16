function deleteCharacter() {
	let currentValue = $('.inputDisplay').val();
	$('.inputDisplay').val(currentValue.substring(0, currentValue.length - 1));
}
function insertCharacter(char) {
	let currentValue = $('.inputDisplay').val();
	let length = currentValue.length;
	let flag = false;
	if(char == '+' || char == '-' || char == '*' || char == '/')
	flag = true;
	if(length == 0)
	{
		if(flag)
		return;
	}
	let flagNew = false;
	let lastCharacter = currentValue[length-1];
	if(lastCharacter == '+' || lastCharacter == '-' || lastCharacter == '*' || lastCharacter == '/')
	flagNew = true;
	if(flag && flagNew)
	$('.inputDisplay').val(currentValue.substring(0,length-1) + char);
	else
	$('.inputDisplay').val($('.inputDisplay').val() + char);
}
function clearInput() {
	$('.inputDisplay').val('');
}
function result() {
	let currentValue = $('.inputDisplay').val();
	let length = currentValue.length;
	let flag = false;
	let char = currentValue[length-1];
	if(char == '+' || char == '-' || char == '*' || char == '/')
	flag = true;
	if(flag)
		$('.inputDisplay').val("ERROR!");
	else
		$('.inputDisplay').val(eval($('.inputDisplay').val()));
}