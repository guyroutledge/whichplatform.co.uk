<?php include_once('inc/header.php') ?>

	<div class="search">
		<ul class="nav nav-search">
			<li><a href="#" class="destinations is-active">Destinations</a></li>
			<li><a href="#" class="platforms">Platforms</a></li>
		</ul>
		<form id="search-form" class="search-form">
			<span class="input-container">
				<input type="search" id="search-field" placeholder="eg. Gatwick Airport">
				<label for="search-field">Search:</label>
			</span>
		</form>
	</div>

	<?php include_once('inc/nav-alphabetical.php') ?>

	<ul id="results-container" class="results">
		<?php // populated with results ?>
	</ul>

<?php include_once('inc/footer.php') ?>
