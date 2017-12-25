window.onload = function() {
	let parent = document.querySelector('.parent')
	let grid = new fcGrid( parent, {})
	let template = []

	let img = ["http://static1.cooklook.ru/images/1e/da/74/2b/t_1eda742b3bfc85bf8af0adb4fdaeac2ade86d24cbb6d162d5f6abf4efe8c5d4f.jpg", 
		"http://static1.cooklook.ru/images/ec/3a/e0/78/t_ec3ae07862a12a2e8f43f09af7f7733c2dfe619052e2a0f2fa3b109b154ad1dd.jpg",
		"http://static1.cooklook.ru/images/aa/e1/5a/c0/t_aae15ac0c50d41a881e810e154ff811481207f92a33674e2ddc53f7c766a6bff.jpg",
		"http://static1.cooklook.ru/images/68/5c/76/2a/t_685c762afcd9bdb80851568870d1a573c5575837c0d129611f10ccdf1d9a00b0.jpg",
		"http://static1.cooklook.ru/images/88/68/e8/44/t_8868e84422010da241db6ef7ed43e34c40ab04e4a7da17ee00ad6de9f5810f0a.jpg",
		"http://static1.cooklook.ru/images/eb/a6/71/a2/t_eba671a2860b40d9fe3fd5fa5661b20065f48004916701800d9ec87417fc7a0e.jpg",
		"http://static1.cooklook.ru/images/7f/77/a0/cd/t_7f77a0cda15b7a9a08abcd1e0aa1d2ff9b34e2e54d1800e4adae3f8c0d78905d.jpg",
		"http://static1.cooklook.ru/images/db/ea/8b/4d/t_dbea8b4df744c011f86978aaa0a857eeeb2949624a8c9add8810b8122f167f16.jpg",
		"http://static1.cooklook.ru/images/36/5c/ac/62/t_365cac62844d1deb913d274cc22c78875d9b0f781440badc441d14e0758384ff.jpg",
		"http://static1.cooklook.ru/images/d6/67/e8/1e/t_d667e81e14e7ce35f125cb6dedcb25a758174572dff7f4daa05e30171ff41f85.jpg",
		"http://static1.cooklook.ru/images/ea/a1/a4/4e/t_eaa1a44e3c95e741f15361bd742a27a3f31ce890dda82bd102da7d60e4b50716.jpg",
		"http://static1.cooklook.ru/images/57/9d/1d/dc/t_579d1ddc8b8e62f60717dce65e9fd1836bb14ef7e910925afc31051f19a22dd1.jpg",
		"http://static1.cooklook.ru/images/6f/a1/88/0e/t_6fa1880ee41efa91fe7a3bc963f17a276693d9631b9c7989d82501b101f7d8e5.jpg",
		"http://static1.cooklook.ru/images/2a/65/aa/a0/t_2a65aaa0fcc27238e5e623e8a28f44d56393d2126421fa2dedcb4656635d61f4.jpg"
	]

	for (let i of img) {
		let tmp = `<div><img src=${i}><br><p>Test description</p></div>`
		template.push(tmp)
	}

	grid.fillingGrid(template)

	// setTimeout(() => {
	// 	grid.fillingGrid(template)
	// // 	grid.destroyGrid()
	// }, 5000)
}
