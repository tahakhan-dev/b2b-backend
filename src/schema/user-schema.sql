create database hk_spending ;
use hk_spending;

/--

Revamp 2023

Accounts (Table):
id:						bigint				NN, AI,
consumer_id:			varchar(128)		UQ, NN,
account_type:			int					NN
account_id:				varchar(128)		PK, NN,
title:					varchar(200)		NN
account_number			varchar(4)			NN				default: "0000"
account_balance:		decimal(0,20)		NN				default: 0
account_currency:		varchar(20)			NN
bank_id					int					NN				
included_in_networth 	boolean				NN				default: 1
is_active				boolean				NN				default: 1
record_created_on		Datetime			NN				
record_updated_on		Datetime			NN
server_created_on		Datetime			NN				default: TIMESTAMP_CURRENT
server_updated_on		Datetime			NN				default: TIMESTAMP_CURRENT
is_deleted				boolean				NN				default: 0

Notes:
1. Outflow interval based
2. Inflow Interval based
3. Opennning Balance interval based


Account_types (Table)
id		Type


BANKS (table)
ID		NAME					SHORTFORM		Region
1		Habib Bank Limited		HBL				Pakistan


Views:

1. Outflow
2. Inflow
3. Closing Balance
--/