<?php include_once('inc/header.php') ?>

	<div class="search">
		<ul class="nav nav-search">
			<li><a href="#" class="is-active">Destinations</a></li>
			<li><a href="#">Platforms</a></li>
		</ul>
		<form id="search-form" class="search-form">
			<span class="input-container">
				<label for="search">Search:</label>
				<input type="search" id="search" placeholder="eg. Gatwick Airport">
			</span>
		</form>
	</div>

	<?php include_once('inc/nav-alphabetical.php') ?>

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