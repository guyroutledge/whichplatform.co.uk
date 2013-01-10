<?php include_once('inc/header.php') ?>

	<div class="search">
		<nav class="nav-search">
			<a href="#"></a>
			<a href="#"></a>
		</nav>
		<form id="search-form">
			<label for="search">Search:</label>
			<input type="search" id="search" placeholder="eg. Gatwick Airport">
		</form>
	</div>

	<nav class="nav nav-alphabetical">
		<?php include_once('inc/nav-alphabetical.php') ?>
	</nav>

	<div id="result-container" class="result-container">
		<ul class="destinations">
			<li>
				<a href="#">Addlestone</a>
				<div class="entry-content is-hidden">
					<ul class="platforms">
						<li>Platform 5</li>
						<li>Platform 6</li>
						<li>Platform 11</li>
					</ul>
				</div>
			</li>
			<li>
				<a href="#">Aldershot</a>
				<div class="entry-content is-hidden">
					<ul class="platforms">
						<li>Platform 9</li>
						<li>Platform 11 <i>- limited service</i></li>
					</ul>
				</div>
			</li>
			<li>
				<a href="#">Alton</a>
				<div class="entry-content is-hidden">
					<ul class="platforms">
						<li>Platform 9</li>
						<li>Platform 11 <i>- limited service</i></li>
					</ul>
				</div>
			</li>
			<li>
				<a href="#">Amberley</a>
				<div class="entry-content is-hidden">
					<ul class="platforms">
						<li>Platform 13</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>

<?php include_once('inc/footer.php') ?>