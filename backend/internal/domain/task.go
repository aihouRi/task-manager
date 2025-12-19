package domain

type Task struct {
	ID          int    `db:"id" json:"id"`
	Title       string `db:"title" json:"title"`
	Description string `db:"description" json:"description"`
	Status      bool   `db:"status" json:"status"`
	UserID      int    `db:"user_id" json:"user_id"`
}
