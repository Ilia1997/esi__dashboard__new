<script>
	import { slide } from 'svelte/transition';
	import { globalData } from '$lib/globalStore.js';
	import {
		withdrawMethod,
		withdrawBalance,
		withdrawFormState,
		radioValue
	} from './../withdrawStore.js';
	import Radio from '$lib/components/inputs/Radio.svelte';
	import { t } from '$lib/translations/i18n.js';
	import { checkInputNumber, checkInputValue } from '$lib/functions/checkInputNumber.js';

	let amountErrorMessage, withdrawMaxSum;
	const minWithdrawSum = 10;
	$radioValue = '0'

	const options = [
		{
			value: '0',
			label: `${$t('MANAGE_SAME')} %`
		},
		{
			value: '1',
			label: $t('MANAGE_EQ_AM')
		},
		{
			value: '2',
			label: $t('MANAGE_PUT_AM')
		}
	];
	$withdrawBalance = Math.trunc($globalData.data.currentSubscription.balance / 5);
	$: {
		$withdrawMethod = $radioValue;
		// $withdrawBalance = isNaN($withdrawBalance) ? 0 : $withdrawBalance;
		withdrawMaxSum = $globalData.data.currentSubscription.balance;
		if ($withdrawBalance < minWithdrawSum && withdrawMaxSum != 0) {
			amountErrorMessage = `${$t('MANAGE_WITHDRAW_LESS_ERR')} ${minWithdrawSum}`;
			$withdrawFormState = true;
		} else if ($withdrawBalance > withdrawMaxSum) {
			amountErrorMessage = `${$t('MANAGE_WITHDRAW_MORE_ERR')} ${withdrawMaxSum}`;
			$withdrawFormState = true;
		} else {
			amountErrorMessage = false;
			$withdrawFormState = false;
		}
	}
</script>

<div class="withdraw__manager b-radius-8 box_shadow-medium">
	<div>
		<div class="text-3">{$t('MANAGE_WD_MANAGER')}</div>
		<div class="text-xsm mt-0_5">
			{$t('WHERE_WITHDRAW')}*
		</div>
	</div>
	<div class="withdraw__main d-flex justify-sb align-top mobile-block">
		<div class="d-flex align-center withdraw__input--body mr-2">
			<div class="withdraw__input relative">
				<input
					class:error={amountErrorMessage}
					type="text"
					id="name"
					name="name"
					inputmode="decimal"
					maxlength="7"
					on:mousewheel={(e) => {
						e.target.blur();
					}}
					on:input={checkInputValue}
					on:keydown={checkInputNumber}
					on:keyup={checkInputNumber}
					bind:value={$withdrawBalance}
					disabled={$radioValue === '2' || withdrawMaxSum <= 0 || $globalData.data.currentSubscription.statusId === 5237002}
				/>
				{#if amountErrorMessage}
					<p class="text-left text-xsm error_text amount__error" transition:slide|local>
						{amountErrorMessage}
						{$globalData.data.currency.symbol}
					</p>
				{/if}
			</div>
			<div class="withdraw__label">{$t('OVERVIEW_TOTAL')}</div>
		</div>
		<div class="radio__wrapper">
			<Radio
				{options}
				fontSize={16}
				bind:userSelected={$radioValue}
				disabledState={$withdrawFormState || withdrawMaxSum <= 0 || $globalData.data.currentSubscription.statusId === 5237002}
			/>
		</div>
	</div>
</div>

<style>
	.withdraw__manager {
		color: var(--label--color-secondary);
		background: #c4cdd7;
		border: 1px solid #5a7186;
		padding: 2.125rem 8.5rem 2.125rem 4rem;
	}
	.withdraw__main {
		margin-top: 2.5rem;
	}
	.withdraw__input {
		margin-right: 2.5rem;
		font-weight: var(--font-weight-bold);
		width: 100%;
		max-width: 360px;
	}
	.radio__wrapper {
		min-width: 275px;
	}
	.withdraw__input--body {
		width: 100%;
	}
	.amount__error {
		position: absolute;
		bottom: -35px;
		left: 5px;
	}
	.withdraw__label {
		font-weight: var(--font-weight-bold);
	}

	@media only screen and (min-width: 0px) and (max-width: 1199px) {
		.withdraw__manager {
			padding: 2rem 1rem;
		}
		.withdraw__input {
			margin-right: 1rem;
		}
	}
	@media only screen and (max-width: 991px) {
		.withdraw__input--body {
			flex-direction: column-reverse;
			align-items: flex-start;
			margin-bottom: 20px;
		}
		.withdraw__label {
			padding-left: 1rem;
			padding-bottom: 0.5rem;
		}
		.amount__error {
			position: static;
			margin: 0;
		}
	}
</style>
