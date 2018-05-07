var uniqueItems = _([1, 2, 3, 4, 5, 6, 7, 4, 3, 100, 2, 1, 2, 4, 5, 6, 70, 7, 8, 9]).uniq();

console.log(uniqueItems);

$('#init').html('<ul></ul>');

uniqueItems.forEach((i) => {
	$('#init ul').append('<li>' + i + '</li>');
});
