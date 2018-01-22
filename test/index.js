window.onload = function() {
	let parent = document.querySelector('.parent')
	let grid = new fcGrid( parent, {})
	let template = []

	let img = ["http://static1.cooklook.ru/images/c9/c3/87/fb/t_c9c387fbb3a8e42bc3892da584064714c6113da5cbd1ea204c6acd6d38507c04.jpg", 
		"http://static1.cooklook.ru/images/1a/38/f5/89/t_1a38f589c44cafd6773c0f6429513c42b6fe4a7d3d27267c41a3e49b9c5de717.jpg",
		"http://static1.cooklook.ru/images/2a/91/40/fb/t_2a9140fb60d7eca5fb5582710d6f387b811b38662e00f908b23b93042b0abe49.jpg",
		"http://static1.cooklook.ru/images/68/5c/76/2a/t_685c762afcd9bdb80851568870d1a573c5575837c0d129611f10ccdf1d9a00b0.jpg",
		"http://static1.cooklook.ru/images/b9/fd/b6/2e/t_b9fdb62ee5a8c473b701e009dd9c2305bb0d6c4579c7996b68cac59d35728af5.jpg",
		"http://static1.cooklook.ru/images/29/c8/fd/01/t_29c8fd016e3ad5619762abeafe2536372f93faa14a55885cfa81c0f7ec3478e9.jpg",
		"http://static1.cooklook.ru/images/66/59/cd/b0/t_6659cdb0d6eae4ce93177dd2c948a94014370ee0b7070229b5ee23b0ee332bfa.jpg",
		"http://static1.cooklook.ru/images/db/ea/8b/4d/t_dbea8b4df744c011f86978aaa0a857eeeb2949624a8c9add8810b8122f167f16.jpg",
		"http://static1.cooklook.ru/images/1a/8e/40/17/t_1a8e4017696dce5a882fcc04def391d513d478375209b3506b198c4e64547599.jpg",
		"http://static1.cooklook.ru/images/fc/5a/bd/34/t_fc5abd34439629ce0b0c18cc026829e3d291ef19d53dbea091a0761c5a2f4bd0.jpg",
		"http://static1.cooklook.ru/images/b7/9d/09/06/t_b79d0906e470ec42edb66bd8453a4d8351ad3990e64d6f40d65fa2f9dcf22601.jpg",
		"http://static1.cooklook.ru/images/9c/19/9b/48/t_9c199b4865920d7c308a45ca70bd5e36f613306a38ca767e1073f9355a07448d.jpg",
		"http://static1.cooklook.ru/images/95/cd/de/2a/t_95cdde2ae14b00b37c7b9b8aeaac08ced572826f0a7389d4576fa0f0baed5604.jpg",
		"http://static1.cooklook.ru/images/f9/f0/8e/ee/t_f9f08eee3a1d9993ca65e112f5681dfae6c6ab7e5160ffa5ae99f4e828b7868c.jpg"

	]

	let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

	for (let i of img) {
		let tmp = `<div><img src=${i}><br><p>Test description</p></div>`
		template.push(tmp)
	}

	for (let i=0; i<5; i++) {
		let tmp = `<p>${text}</p>`
		template.push(tmp)
	}

	grid.fillingGrid(template)

	let add = function() {
	    let position = document.documentElement.scrollTop
	    if (document.documentElement.offsetHeight === (position + window.innerHeight)) {
	        grid.fillingGrid(template)
	    }
	}
	window.addEventListener('scroll', add);

	// setTimeout(() => {
	// 	// grid.fillingGrid(template)
	// 	grid.destroyGrid()
	// }, 5000)
}
