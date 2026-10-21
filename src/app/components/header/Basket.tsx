import React from "react"
import { Box, Button, Stack } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Menu from "@mui/material/Menu"
import CancelIcon from "@mui/icons-material/Cancel"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useNavigate } from "react-router-dom"
import { CartItem } from "../../../libs/types/search"
import { Messages, serverApi } from "../../../libs/config"
import { useGlobals } from "../../hooks/useGlobals.ts"
import OrderService from "../../services/OrderService"
import { sweetErrorHandling } from "../../../libs/sweetAlert"
import "../../../css/basket.css"

export default function Basket() {
  const { BASKET, authMember, setOrderBuilder } = useGlobals()
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = BASKET
  const navigate = useNavigate()
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
  )
  const deliveryCost: number = itemsPrice < 100 ? 5 : 0
  const totalPrice = (itemsPrice + deliveryCost).toFixed(1)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const proceedOrderHandler = async () => {
    try {
      handleClose()
      if (!authMember) throw new Error(Messages.error2)

      const order = new OrderService()
      await order.createOrder(cartItems)

      onDeleteAll()

      // REFRESH VIA CONTEXT
      setOrderBuilder(new Date())
      navigate("/orders")
    } catch (err) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <img src={"/icons/shopping-cart.svg"} alt="" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack direction={"row"}>
                <div>Cart Products:</div>
                <DeleteForeverIcon
                  sx={{ ml: "5px", cursor: "pointer" }}
                  color={"primary"}
                  onClick={() => onDeleteAll()}
                />
              </Stack>
            )}
          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`
                return (
                  <Stack className={"basket-info-box"} key={item._id}>
                    <img src={imagePath} className={"product-img"} alt="" />
                    <span className={"product-name"}>{item.name}</span>
                    <Box className={"product-price"}>
                      ${item.price} x {item.quantity}
                    </Box>

                    <div className="col-2">
                      <button onClick={() => onRemove(item)} className="remove">
                        -
                      </button>{" "}
                      <button onClick={() => onAdd(item)} className="add">
                        +
                      </button>
                    </div>
                    <div className={"cancel-btn"}>
                      <CancelIcon
                        color={"primary"}
                        onClick={() => onDelete(item)}
                      />
                    </div>
                  </Stack>
                )
              })}
            </Box>
          </Box>
          {cartItems.length !== 0 ? (
            <Stack className={"basket-order"}>
              <Stack className="price-breakdown">
                <span className="price-line">
                  Items total: ${itemsPrice} / Delivery: ${deliveryCost}
                </span>
                <span className="price-total">Total: ${totalPrice}</span>
              </Stack>
              <Button
                onClick={proceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
                sx={{ color: "#fff" }}
              >
                Order
              </Button>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  )
}
