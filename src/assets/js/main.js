var uniqueItems = _.chain([1, 2, 3, 4, 5, 6, 7, 4, 3, 100, 2, 1, 2, 4, 5, 6, 70, 7, 8, 9]).uniq().value();

console.log(uniqueItems);

$('#init').html('<ul></ul>');

uniqueItems.forEach((i) => {
	$('#init ul').append('<li>' + i + '</li>');
});
